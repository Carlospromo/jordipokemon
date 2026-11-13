#!/usr/bin/env node
// Valida content/interview.json contra content/transcript.md.
// Uso: node tools/validate-content.js [ruta-json] [ruta-transcripción]

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const LIMITS = { question: 140, option: 90, quote: 220 };
const OPTION_COUNT = { choice: 4, complete: 4, true_false: 2 };
const QUOTE_MATCH_THRESHOLD = 0.6;
const INTERVIEWEE = 'Entrevistado';

export function toSeconds(time) {
  const match = /^(\d{2}):(\d{2}):(\d{2})$/.exec(time ?? '');
  if (!match) return NaN;
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
}

export function parseTranscript(text) {
  const entries = [];
  for (const line of text.split(/\r?\n/)) {
    const match = /^\[(\d{2}:\d{2}:\d{2})\]\s*([^:]+):\s*(.*)$/.exec(line);
    if (match) entries.push({ start: toSeconds(match[1]), speaker: match[2].trim(), text: match[3] });
  }
  entries.forEach((entry, i) => {
    entry.end = i + 1 < entries.length ? entries[i + 1].start : Infinity;
  });
  return entries;
}

export function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

// Proporción de palabras de la cita presentes en lo que dijo el entrevistado en el tramo.
export function quoteMatch(quote, entries, start, end) {
  const spoken = new Set(
    entries
      .filter((e) => e.speaker === INTERVIEWEE && e.start < end && e.end > start)
      .flatMap((e) => normalize(e.text)),
  );
  const words = normalize(quote);
  if (words.length === 0) return 0;
  return words.filter((w) => spoken.has(w)).length / words.length;
}

export function validate(data, transcriptText) {
  const errors = [];
  const warnings = [];
  const entries = parseTranscript(transcriptText);
  const err = (where, msg) => errors.push(`${where}: ${msg}`);

  const meta = data.meta ?? {};
  for (const key of ['title', 'version', 'summary', 'duration']) {
    if (typeof meta[key] !== 'string' || !meta[key]) err('meta', `falta "${key}"`);
  }
  for (const key of ['interviewee', 'interviewer']) {
    if (!meta[key]?.name || !meta[key]?.role) err('meta', `falta "${key}" con name y role`);
  }
  if (!Array.isArray(meta.intro) || meta.intro.length < 1) err('meta', 'falta "intro"');
  if (!meta.closing?.text) err('meta', 'falta "closing.text"');
  const duration = toSeconds(meta.duration);
  const excluded = (meta.excluded ?? []).map((x) => ({ start: toSeconds(x.start), end: toSeconds(x.end) }));

  const zones = Array.isArray(data.zones) ? data.zones : [];
  if (zones.length < 1) err('zones', 'no hay zonas');
  const ids = new Set();
  const stats = { zones: {}, types: {}, unverified: [] };

  for (const zone of zones) {
    const zid = zone.id ?? '(zona sin id)';
    if (ids.has(zid)) err(zid, 'id duplicado');
    ids.add(zid);
    for (const key of ['title', 'intro']) {
      if (typeof zone[key] !== 'string' || !zone[key]) err(zid, `falta "${key}"`);
    }
    if (!Array.isArray(zone.keyIdeas) || zone.keyIdeas.length < 2 || zone.keyIdeas.length > 4) {
      err(zid, 'keyIdeas debe tener entre 2 y 4 elementos');
    }
    const turns = Array.isArray(zone.turns) ? zone.turns : [];
    if (turns.length < 3 || turns.length > 6) err(zid, `tiene ${turns.length} preguntas (debe tener de 3 a 6)`);
    stats.zones[zid] = turns.length;

    for (const turn of turns) {
      const tid = turn.id ?? `${zid}/(pregunta sin id)`;
      if (ids.has(tid)) err(tid, 'id duplicado');
      ids.add(tid);
      stats.types[turn.type] = (stats.types[turn.type] ?? 0) + 1;

      if (!(turn.type in OPTION_COUNT)) err(tid, `tipo desconocido "${turn.type}"`);
      if (typeof turn.question !== 'string' || !turn.question) err(tid, 'falta "question"');
      else if (turn.question.length > LIMITS.question) err(tid, `pregunta de ${turn.question.length} caracteres (máx. ${LIMITS.question})`);
      if (turn.type === 'complete' && !turn.question?.includes('___')) err(tid, 'una pregunta "complete" necesita el hueco ___');

      const options = Array.isArray(turn.options) ? turn.options : [];
      if (turn.type in OPTION_COUNT && options.length !== OPTION_COUNT[turn.type]) {
        err(tid, `tiene ${options.length} opciones (debe tener ${OPTION_COUNT[turn.type]})`);
      }
      const kinds = options.map((o) => o.kind);
      if (kinds.filter((k) => k === 'real').length !== 1) err(tid, 'debe tener exactamente una opción "real"');
      if (kinds.filter((k) => k === 'partial').length > 1) err(tid, 'como mucho una opción "partial"');
      if (turn.type !== 'choice' && kinds.includes('partial')) err(tid, 'solo "choice" admite opción "partial"');
      if (kinds.some((k) => !['real', 'partial', 'false'].includes(k))) err(tid, 'opción con "kind" desconocido');
      const texts = new Set();
      for (const option of options) {
        if (typeof option.text !== 'string' || !option.text) err(tid, 'opción sin texto');
        else if (option.text.length > LIMITS.option) err(tid, `opción de ${option.text.length} caracteres (máx. ${LIMITS.option}): "${option.text}"`);
        if (texts.has(option.text)) err(tid, 'opciones repetidas');
        texts.add(option.text);
      }

      if (typeof turn.verified !== 'boolean') err(tid, 'falta "verified" (true/false)');
      if (turn.verified === false) stats.unverified.push(tid);
      if (typeof turn.quote !== 'string' || !turn.quote) err(tid, 'falta "quote"');
      else if (turn.quote.length > LIMITS.quote) err(tid, `cita de ${turn.quote.length} caracteres (máx. ${LIMITS.quote})`);

      const start = toSeconds(turn.source?.start);
      const end = toSeconds(turn.source?.end);
      if (Number.isNaN(start) || Number.isNaN(end)) {
        err(tid, 'source.start y source.end deben tener formato HH:MM:SS');
        continue;
      }
      if (start >= end) err(tid, 'source.start debe ser anterior a source.end');
      if (!Number.isNaN(duration) && end > duration) err(tid, 'source.end supera la duración de la entrevista');
      if (excluded.some((x) => start < x.end && end > x.start)) err(tid, 'el tramo pisa una zona excluida');
      const spoke = entries.some((e) => e.speaker === INTERVIEWEE && e.start < end && e.end > start);
      if (!spoke) err(tid, 'no hay ninguna intervención del entrevistado en ese tramo');
      else if (turn.quote) {
        const ratio = quoteMatch(turn.quote, entries, start, end);
        if (ratio < QUOTE_MATCH_THRESHOLD) {
          const msg = `solo el ${Math.round(ratio * 100)} % de la cita aparece en la transcripción del tramo`;
          if (turn.verified) err(tid, msg);
          else warnings.push(`${tid}: ${msg}`);
        }
      }
    }
  }
  return { errors, warnings, stats };
}

function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const jsonPath = process.argv[2] ?? resolve(root, 'content/interview.json');
  const transcriptPath = process.argv[3] ?? resolve(root, 'content/transcript.md');
  const data = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const { errors, warnings, stats } = validate(data, readFileSync(transcriptPath, 'utf8'));

  const total = Object.values(stats.zones).reduce((a, b) => a + b, 0);
  console.log(`Zonas: ${Object.keys(stats.zones).length} · Preguntas: ${total}`);
  console.log('Por zona: ' + Object.entries(stats.zones).map(([k, v]) => `${k}=${v}`).join(', '));
  console.log('Por tipo: ' + Object.entries(stats.types).map(([k, v]) => `${k}=${v}`).join(', '));
  console.log(`Citas sin verificar (${stats.unverified.length}): ${stats.unverified.join(', ') || 'ninguna'}`);
  for (const w of warnings) console.log(`AVISO  ${w}`);
  for (const e of errors) console.error(`ERROR  ${e}`);
  console.log(errors.length ? `\n${errors.length} error(es).` : '\nContenido válido.');
  process.exit(errors.length ? 1 : 0);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
