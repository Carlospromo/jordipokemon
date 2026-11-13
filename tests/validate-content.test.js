import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validate, toSeconds, normalize, parseTranscript, quoteMatch } from '../tools/validate-content.js';

const TRANSCRIPT = [
  '[00:00:00] Entrevistador: ¿Vas a bajar los impuestos?',
  '',
  '[00:00:10] Entrevistado: Mi planteamiento es clarísimo: bajar los impuestos.',
  '',
  '[00:00:20] Entrevistador: ¿Y las pensiones?',
  '',
  '[00:00:30] Entrevistado: Las pensiones se actualizarán con el índice de precios.',
].join('\n');

function sample() {
  const turn = (id) => ({
    id,
    type: 'choice',
    question: '¿Vas a bajar los impuestos?',
    options: [
      { text: 'Sí, bajarlos.', kind: 'real' },
      { text: 'No, subirlos.', kind: 'false' },
      { text: 'Dejarlos igual.', kind: 'false' },
      { text: 'Depende.', kind: 'false' },
    ],
    quote: 'Mi planteamiento es clarísimo: bajar los impuestos.',
    verified: true,
    source: { start: '00:00:10', end: '00:00:20' },
  });
  return {
    meta: {
      title: 'T', version: '1', summary: 'S', duration: '00:01:00',
      interviewee: { name: 'A', role: 'a' }, interviewer: { name: 'B', role: 'b' },
      intro: ['Hola'], closing: { text: 'Adiós' },
    },
    zones: [{ id: 'zone-01', title: 'Z', intro: 'I', keyIdeas: ['a', 'b'], turns: [turn('t1'), turn('t2'), turn('t3')] }],
  };
}

test('utilidades', () => {
  assert.equal(toSeconds('01:02:03'), 3723);
  assert.ok(Number.isNaN(toSeconds('1:2:3')));
  assert.deepEqual(normalize('¡Clarísimo: el 3,5 %!'), ['clarisimo', 'el', '3', '5']);
  const entries = parseTranscript(TRANSCRIPT);
  assert.equal(entries.length, 4);
  assert.equal(entries[1].end, 20);
  assert.equal(quoteMatch('bajar los impuestos', entries, 10, 20), 1);
  assert.equal(quoteMatch('bajar las pensiones', entries, 30, 40), 2 / 3);
});

test('un contenido correcto no da errores', () => {
  assert.deepEqual(validate(sample(), TRANSCRIPT).errors, []);
});

test('detecta dos opciones reales', () => {
  const data = sample();
  data.zones[0].turns[0].options[1].kind = 'real';
  assert.match(validate(data, TRANSCRIPT).errors.join('\n'), /exactamente una opción "real"/);
});

test('detecta una cita que no está en el tramo', () => {
  const data = sample();
  data.zones[0].turns[0].quote = 'Nunca dije nada parecido sobre ese asunto concreto.';
  assert.match(validate(data, TRANSCRIPT).errors.join('\n'), /de la cita aparece/);
  data.zones[0].turns[0].verified = false;
  const result = validate(data, TRANSCRIPT);
  assert.deepEqual(result.errors, []);
  assert.equal(result.warnings.length, 1);
});

test('detecta un tramo sin intervención del entrevistado', () => {
  const data = sample();
  data.zones[0].turns[0].source = { start: '00:00:00', end: '00:00:10' };
  assert.match(validate(data, TRANSCRIPT).errors.join('\n'), /ninguna intervención del entrevistado/);
});

test('detecta tramos excluidos, ids duplicados y textos largos', () => {
  const data = sample();
  data.meta.excluded = [{ start: '00:00:05', end: '00:00:15' }];
  data.zones[0].turns[1].id = 't1';
  data.zones[0].turns[2].options[0].text = 'x'.repeat(91);
  const errors = validate(data, TRANSCRIPT).errors.join('\n');
  assert.match(errors, /zona excluida/);
  assert.match(errors, /id duplicado/);
  assert.match(errors, /opción de 91 caracteres/);
});

test('detecta zonas con pocas preguntas y tipos mal formados', () => {
  const data = sample();
  data.zones[0].turns.pop();
  data.zones[0].turns[0].type = 'true_false';
  const errors = validate(data, TRANSCRIPT).errors.join('\n');
  assert.match(errors, /debe tener de 3 a 6/);
  assert.match(errors, /debe tener 2/);
});

test('el contenido real del juego es válido', () => {
  const data = JSON.parse(readFileSync(new URL('../content/interview.json', import.meta.url), 'utf8'));
  const transcript = readFileSync(new URL('../content/transcript.md', import.meta.url), 'utf8');
  const { errors, stats } = validate(data, transcript);
  assert.deepEqual(errors, []);
  assert.equal(Object.keys(stats.zones).length, 10);
  assert.equal(Object.values(stats.zones).reduce((a, b) => a + b, 0), 58);
});
