# Fase 1 — Contenido

> Prompt para una sesión nueva de Claude Code en este repositorio. Copiar a partir de la línea siguiente.

---

Vas a ejecutar la **Fase 1 (Contenido)** del juego descrito en `CLAUDE.md`. En esta fase **no se programa el juego**: se produce y se valida el contenido que el motor consumirá.

## Lee antes de empezar

1. `CLAUDE.md` entero (reglas innegociables, esquema de `interview.json`).
2. `docs/esquema-juego.md` entero (10 zonas, 58 preguntas, criterios de contenido).
3. `content/transcript.md` entero. Es una transcripción automática con erratas.

## Qué tienes que entregar

1. **`content/interview.json`** con las 10 zonas y las 58 preguntas del esquema, siguiendo el esquema de datos de `CLAUDE.md`:
   - `meta`: título, entrevistado, entrevistador, resumen de 2–3 frases, `intro` (3–4 cuadros de diálogo con los datos de la sección 1 del esquema), `closing` (alegato final, 01:26:57–01:28:18) y `version`.
   - Por zona: `id`, `title`, `intro` (una frase del rival al empezar), `keyIdeas` (2–4) y `turns`.
   - Por pregunta: `id`, `type`, `question`, `options`, `quote`, `context` (opcional), `source`, `verified`.
2. **`tools/validate-content.js`** (Node, sin dependencias) y **`tests/validate-content.test.js`**.
3. Sección "Comandos" de `CLAUDE.md` actualizada si cambia algo.

## Cómo redactar cada pregunta

- **`question`**: la pregunta del entrevistador, condensada a un máximo de 140 caracteres, comprensible sin contexto previo.
- **`options`**: máximo 90 caracteres cada una, redactadas en primera persona, con longitud y tono parecidos entre sí para que la correcta no destaque por la forma.
  - `choice`: 4 opciones; exactamente una `real`; como mucho una `partial`; el resto `false`.
  - `complete`: `question` es la cita con `___`; 4 opciones cortas, una `real`.
  - `true_false`: `question` es la afirmación; 2 opciones («Verdadero» / «Falso»), una `real`.
- **Respuesta real**: parte de la columna «Respuesta real» del esquema y contrástala con el tramo de la transcripción. Si la transcripción no la sostiene, corrige el esquema y dilo en el resumen final.
- **Evasivas**: cuando el entrevistado no contestó, la opción real lo dice tal cual.
- **Distractores**: errores razonables (otra cifra, postura más tajante o más tibia, medida parecida). Nunca posturas ofensivas, caricaturas ni nada que pueda leerse como una declaración real que no hizo.
- **`quote`**: 1–2 frases, máximo 220 caracteres, tomadas del tramo `source`. Corrige solo erratas evidentes de la transcripción automática (ortografía, nombres propios, palabras mal oídas); no cambies el sentido ni añadas palabras que no estén. Usa `[…]` para omisiones.
- **`verified`**: `false` en las citas marcadas con ⚠ en el esquema y en cualquier otra en la que hayas tenido que interpretar la transcripción; `true` en el resto.
- **`context`**: una línea neutral solo cuando haga falta para entender la cita (por ejemplo, la corrección de los verificadores en `z03-t06`).
- **`clip`**: no lo incluyas; todavía no hay audio.

## Reglas que no puedes saltarte

- Neutralidad: ni las preguntas, ni los distractores, ni los `keyIdeas` valoran si lo que dijo es cierto o acertado.
- No uses el tramo excluido (01:02:23–01:08:29, insinuación sobre las primarias de Sánchez) ni líneas de «Voz sin identificar».
- No inventes preguntas fuera del esquema. Si crees que una pregunta del esquema no se sostiene, sustitúyela por otra del mismo tramo y avisa.
- Textos en español; identificadores en inglés.

## El validador

`node tools/validate-content.js` debe salir con código 0 solo si:

- El JSON cumple el esquema y los `id` son únicos.
- Hay 10 zonas y cada una tiene entre 3 y 6 preguntas.
- Cada pregunta tiene exactamente una opción `real` y el número de opciones propio de su tipo.
- Se respetan los límites de longitud.
- `source.start` < `source.end`, ambos dentro de la duración de la entrevista, y existe al menos una intervención del **Entrevistado** en ese tramo de `content/transcript.md`.
- Al menos el 60 % de las palabras de `quote` (normalizadas: minúsculas, sin tildes ni puntuación) aparece en las intervenciones del Entrevistado de ese tramo. Por debajo de ese umbral, error si `verified` es `true` y aviso si es `false`.
- Ningún `source` pisa el tramo excluido.

Al final imprime un resumen: preguntas por zona, por tipo y número de citas sin verificar.

## Hecho cuando

- `node tools/validate-content.js` y `node --test tests/` pasan.
- Has releído las 58 preguntas contra la transcripción una segunda vez, buscando respuestas reales que no se sostienen y distractores que también serían ciertos.
- Has entregado al usuario un resumen con: cambios respecto al esquema, lista de citas con `verified: false` y dudas abiertas.

## Fuera de alcance

HTML, CSS, motor de batalla, arte, sonido, publicación.
