# CLAUDE.md

Guía de trabajo para este repositorio. Léela entera antes de tocar nada.

## Qué es este proyecto

Un videojuego web de **batallas por turnos al estilo de los RPG clásicos de captura de monstruos**, cuyo contenido sale íntegramente de **una entrevista real** (audio + transcripción).

- El **jugador encarna al entrevistado**.
- El **entrevistador es el rival**: cada pregunta suya es un "ataque".
- El jugador responde eligiendo entre varios "movimientos" (respuestas). Solo uno refleja **lo que el entrevistado dijo de verdad**.
- Objetivo real del juego: que quien juega **termine sabiendo qué se habló en la entrevista y qué respondió el entrevistado**. La gamificación está al servicio de eso, no al revés.

## Estado actual

Repositorio recién creado. Aún **no hay audio ni transcripción**. Nada de contenido de la entrevista puede escribirse hasta que exista `content/transcript.md` (ver "Flujo de contenido").

## Reglas innegociables

1. **Fidelidad a la entrevista.** Toda respuesta marcada como correcta, toda cita y todo resumen debe poder rastrearse a un tramo concreto de la transcripción (`source.start` / `source.end`). Si no está en la transcripción, no entra en el juego.
2. **No inventar declaraciones.** Las respuestas incorrectas (distractores) son verosímiles pero nunca se presentan como algo que el entrevistado dijo. Tras cada turno se muestra siempre la respuesta real, se acierte o no.
3. **No poner en boca del entrevistado nada ofensivo o dañino** como distractor. Los distractores son errores razonables (matices, cifras, posturas contrarias suaves), no caricaturas.
4. **Arte, nombres, música y textos 100 % originales.** Es un juego "del género", no una copia: nada de sprites, criaturas, nombres, tipografías, sonidos ni interfaz calcados de Pokémon ni de ninguna otra franquicia. Los nombres de este documento (Citadex, Medallas, etc.) son propios.
5. **Motor y contenido separados.** El motor no contiene ni una frase de la entrevista; todo vive en `content/`. Cambiar de entrevista debe ser cambiar un JSON y unos audios.
6. **Idioma:** textos del juego y de documentación en español; identificadores de código en inglés.

## Diseño del juego

### Flujo de pantallas

1. **Título** — nombre del juego, "Pulsa para empezar", continuar partida.
2. **Intro** — un presentador explica en 3–4 cuadros de diálogo quién es el entrevistado, quién el entrevistador y de qué va la entrevista. Se elige nombre de jugador (opcional).
3. **Mapa de temas** — cada bloque temático de la entrevista es una **zona** del mapa. Se desbloquean en el orden real de la entrevista (así el jugador sigue el hilo original). Cada zona muestra título, nº de preguntas y medalla conseguida.
4. **Batalla** (pantalla principal, ver abajo).
5. **Resumen de zona** — medalla obtenida, puntos, y las "ideas clave" del tema (2–4 frases fieles a la transcripción).
6. **Citadex** — colección de citas reales desbloqueadas, por tema, con botón para oír el fragmento de audio original. Las no desbloqueadas aparecen como "???".
7. **Resultado final** — puntuación total, rango, % de fidelidad, medallas, Citadex completado, y un resumen de la entrevista en sus propias palabras.

### La batalla

Composición clásica: rival arriba a la derecha, jugador abajo a la izquierda, barras de energía, caja de diálogo abajo con menú de 4 opciones.

Un **turno**:

1. El entrevistador "ataca": aparece la pregunta real (texto con efecto máquina de escribir; opcionalmente suena el audio de la pregunta).
2. El jugador elige uno de **4 movimientos** (respuestas). Orden aleatorio en cada partida.
3. Resolución:
   - **Respuesta real** → "¡Respuesta certera!": daña la barra de *Presión* del entrevistador, suma puntos, desbloquea la cita en el Citadex.
   - **Respuesta parcial** (opcional por pregunta: cercana pero imprecisa) → "No es del todo así…": daño reducido, pocos puntos.
   - **Respuesta falsa** → "Eso no fue lo que dijo": el jugador pierde *Credibilidad*.
4. **Revelación** (siempre): "Lo que realmente dijo:" + cita literal + reproducción del clip de audio + una línea de contexto si hace falta.
5. Siguiente pregunta. La batalla termina cuando se acaban las preguntas de la zona o la Credibilidad llega a 0 (se puede reintentar la zona; las citas ya vistas quedan en el Citadex).

Tipos de turno, para dar variedad (todos comparten el mismo esquema de datos):

- `choice` — elegir la respuesta real entre 4 (el tipo base).
- `complete` — completar la cita: la frase real con un hueco y 4 opciones.
- `true_false` — "¿Dijo esto?": una afirmación, verdadero/falso.
- `order` — ordenar 3–4 ideas en el orden en que las expuso (para respuestas largas).
- **Jefe final** — última zona: repaso con preguntas de todos los temas, sin opción parcial.

### Puntuación

| Concepto | Puntos |
|---|---|
| Respuesta real | +100 |
| Respuesta parcial | +40 |
| Respuesta falsa | 0 y −1 Credibilidad |
| Racha (combo) | ×1.2, ×1.5, ×2 a partir de 2, 4 y 6 aciertos seguidos |
| Bonus de rapidez | hasta +20 (opcional, desactivable en ajustes) |
| Zona perfecta | +250 y medalla dorada |
| Escuchar el clip completo en la revelación | +10 (premia atender al contenido) |

- **Credibilidad** (vida del jugador): 5 puntos por zona.
- **Presión** (vida del rival): se reparte entre las preguntas de la zona, de modo que acertar todo la vacía exactamente.
- **Medallas** por zona: bronce (≥50 % de fidelidad), plata (≥75 %), oro (100 %).
- **Fidelidad global** = aciertos / preguntas totales. Es la métrica estrella: mide cuánto conoce el jugador la entrevista.
- **Rangos finales** según fidelidad: Oyente despistado → Oyente atento → Cronista → Portavoz oficial.
- **Objetos** (ganados con rachas, máx. 1 uso por batalla cada uno): *Apuntes* (elimina 2 opciones falsas), *Repregunta* (oír 5 s del audio de la respuesta antes de elegir), *Vaso de agua* (+1 Credibilidad).

El progreso (puntos, medallas, Citadex) se guarda en `localStorage`.

## Flujo de contenido (audio → juego)

1. **Entrada.** El usuario aporta `content/transcript.md` (preferido) y/o el audio en `assets/audio/interview.<ext>`. Formato ideal de la transcripción: una intervención por párrafo, con hablante y marca de tiempo, p. ej. `[00:03:12] ENTREVISTADOR: …`.
   - Si solo hay audio, transcribirlo primero, guardar el resultado en `content/transcript.md` y **pedir al usuario que revise nombres propios, cifras y hablantes** antes de seguir.
2. **Análisis** → `content/analysis.md`: quién es quién, tono, lista de bloques temáticos en orden con sus marcas de tiempo, y por bloque las preguntas del entrevistador con la idea central de cada respuesta y las mejores citas literales.
3. **Diseño de preguntas** → `content/interview.json` (esquema abajo). Orientación: 5–8 zonas, 4–6 turnos por zona, 15–20 min de juego. Priorizar las ideas que definen la postura del entrevistado frente a datos anecdóticos.
4. **Clips de audio.** Cortar del audio original los tramos `source` de cada turno a `assets/audio/clips/<id>.mp3` (script en `tools/`). No editar el contenido de los clips.
5. **Validación.** `tools/validate-content` comprueba: esquema, exactamente una opción `real` por turno, `source` dentro de la duración del audio, clip existente y que cada `quote` aparece literalmente en la transcripción.

### Esquema de `content/interview.json`

```jsonc
{
  "meta": {
    "title": "…",
    "interviewee": { "name": "…", "role": "…" },
    "interviewer": { "name": "…", "role": "…" },
    "summary": "…"
  },
  "zones": [
    {
      "id": "zone-01",
      "title": "…",              // tema, con palabras de la entrevista
      "intro": "…",              // lo que dice el rival al empezar
      "keyIdeas": ["…"],         // se muestran en el resumen de zona
      "turns": [
        {
          "id": "z01-t01",
          "type": "choice",      // choice | complete | true_false | order
          "question": "…",       // pregunta real del entrevistador (puede condensarse)
          "options": [
            { "text": "…", "kind": "real" },
            { "text": "…", "kind": "partial" },
            { "text": "…", "kind": "false" },
            { "text": "…", "kind": "false" }
          ],
          "quote": "…",          // cita LITERAL de la transcripción
          "context": "…",        // opcional, una línea
          "source": { "start": "00:03:12", "end": "00:03:41" },
          "clip": "assets/audio/clips/z01-t01.mp3"
        }
      ]
    }
  ]
}
```

## Arquitectura técnica

Web estática, **sin framework ni paso de build**: HTML + CSS + JavaScript (módulos ES). Se abre con cualquier servidor estático y se publica tal cual en GitHub Pages. No añadir dependencias de ejecución sin motivo de peso.

```
index.html
src/
  main.js            arranque y carga de content/interview.json
  state.js           estado de partida, puntuación, guardado en localStorage
  router.js          cambio entre pantallas
  screens/           title, intro, map, battle, zone-summary, citadex, results
  battle/            motor de turnos, resolución, combos, objetos
  ui/                caja de diálogo, menú, barras, efecto máquina de escribir
  audio.js           reproducción de clips y efectos
styles/              estilo pixel-art (paleta limitada, tipografía pixel de licencia libre)
assets/
  sprites/           arte original
  audio/             interview.<ext>, clips/, sfx/
content/
  transcript.md      fuente de verdad
  analysis.md
  interview.json
tools/               validar contenido, cortar clips
tests/               lógica de batalla y puntuación
```

- La lógica de batalla y puntuación es **pura** (sin DOM) y lleva tests.
- Resolución base tipo 480×320 escalada con `image-rendering: pixelated`; debe jugarse bien en móvil (táctil) y en teclado (flechas + Enter).
- Accesibilidad: todo audio tiene su texto en pantalla; nunca depender solo del color; opción de desactivar el bonus de rapidez y las animaciones.

## Comandos

```bash
python3 -m http.server 8000     # servir el juego en local
node --test tests/              # tests de lógica
node tools/validate-content.js  # validar content/interview.json
```

(Actualizar esta sección cuando existan los scripts.)

## Plan de desarrollo

1. **Fase 0 — Contenido.** Recibir transcripción/audio → `analysis.md` → proponer al usuario la lista de zonas y preguntas → `interview.json` validado. *No empezar la fase 1 de contenido real sin el visto bueno del usuario a las zonas.*
2. **Fase 1 — Motor de batalla.** Una zona jugable de principio a fin con turnos `choice`, puntuación, revelación y clip de audio. Puede desarrollarse en paralelo con un `interview.sample.json` de contenido ficticio claramente marcado como tal.
3. **Fase 2 — Juego completo.** Título, intro, mapa, resumen de zona, Citadex, resultado final, guardado.
4. **Fase 3 — Variedad.** Tipos `complete`, `true_false`, `order`, objetos, jefe final.
5. **Fase 4 — Pulido.** Arte y sonido originales, animaciones, móvil, accesibilidad, publicación en GitHub Pages.

## Forma de trabajar

- Commits pequeños y descriptivos, en español.
- Antes de dar algo por terminado: tests en verde, validador de contenido en verde y probar el juego en el navegador.
- Ante la duda sobre qué dijo el entrevistado, se consulta la transcripción; si es ambigua, se pregunta al usuario. Nunca se rellena por intuición.
