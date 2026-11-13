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

### Principios de sesión (web, sin partidas guardadas)

El juego vive en una web: no hay cuentas ni partidas guardadas en las que confiar. Todo el diseño parte de ahí.

- **Batallas cortas y autónomas.** Una batalla = un tema = **3 rondas** (3 preguntas), unos 2 minutos. Ninguna batalla depende de otra.
- **Mapa libre.** Todos los temas están abiertos desde el primer momento. El mapa los numera en el orden real de la entrevista como ruta sugerida, pero el jugador entra en el que quiera y en el orden que quiera.
- **El jugador decide cuánto juega.** No hay mínimo. Puede hacer una sola batalla o todas. Juego completo: **6–8 temas × 3 rondas = 18–24 preguntas, 12–16 minutos**.
- **Se puede salir siempre.** En batalla hay un botón "Mapa" siempre visible; en el mapa, un botón "Terminar entrevista" siempre disponible.
- **No hay derrota ni "game over".** Toda batalla empezada llega a sus 3 rondas si el jugador quiere: lo importante es que vea las 3 respuestas reales. Lo que varía es la medalla.
- **Nada bloquea por perder el progreso.** Como todo está abierto, quien vuelva otro día sin progreso guardado puede jugar exactamente igual.

### Guardado

- **No existe "guardar partida"**, ni ranuras, ni "continuar", ni estado a mitad de batalla.
- Solo hay un **recuerdo automático y ligero** en `localStorage` (una única clave con un JSON pequeño): medalla y mejor puntuación por tema, y citas desbloqueadas del Citadex. Se escribe al terminar cada batalla.
- Es **"mejor esfuerzo"**: si `localStorage` no está disponible (modo privado, otro dispositivo, datos borrados) el juego funciona completo dentro de la sesión, sin avisos de error.
- El recuerdo va ligado a un identificador de versión del contenido; si la entrevista cambia, se descarta.
- En el mapa hay un botón "Borrar progreso".

### Flujo de pantallas

1. **Título** — nombre del juego y "Pulsa para empezar". Va directo a la intro (o al mapa si ya hay progreso recordado).
2. **Intro** — 3–4 cuadros de diálogo: quién es el entrevistado, quién el entrevistador, de qué va la entrevista y cómo se juega. Se puede saltar.
3. **Mapa de temas** — el centro del juego; se vuelve aquí tras cada batalla. Cada tema muestra título, número de orden en la entrevista, medalla conseguida (o "sin explorar"). Cabecera con el progreso: "Has explorado 3 de 7 temas", puntuación total y acceso al Citadex. Botones "Terminar entrevista" y "Borrar progreso".
4. **Batalla** — 3 rondas (ver abajo).
5. **Resumen de batalla** — medalla, puntos, las 3 citas reales y las ideas clave del tema. Botones: "Volver al mapa" (principal), "Siguiente tema" (el siguiente sin explorar) y "Repetir".
6. **Citadex** — citas reales desbloqueadas, por tema, con botón para oír el clip original. Las no desbloqueadas aparecen como "???".
7. **Resultado final** — se llega con "Terminar entrevista" en cualquier momento. Muestra temas explorados, fidelidad, puntuación, medallas, rango y un resumen de lo explorado; de los temas no jugados solo se muestra el título, como invitación a volver. Desde aquí se puede regresar al mapa: terminar no borra nada.

### La batalla

Composición clásica: rival arriba a la derecha, jugador abajo a la izquierda, barra de *Presión* del entrevistador, caja de diálogo abajo con menú de 4 opciones. Indicador "Ronda 1/3" y botón "Mapa".

Una **ronda**:

1. El entrevistador "ataca": aparece la pregunta real (efecto máquina de escribir, saltable con un toque).
2. El jugador elige uno de **4 movimientos** (respuestas). Orden aleatorio.
3. Resolución:
   - **Respuesta real** → "¡Respuesta certera!": quita 1/3 de la Presión y desbloquea la cita en el Citadex.
   - **Respuesta parcial** (opcional por pregunta: cercana pero imprecisa) → "No es del todo así…": quita 1/6 de la Presión.
   - **Respuesta falsa** → "Eso no fue lo que dijo": la Presión no baja.
4. **Revelación** (siempre): "Lo que realmente dijo:" + cita literal + clip de audio + una línea de contexto si hace falta. El clip se puede saltar.

**Abandonar:** el botón "Mapa" pide una confirmación breve y vuelve al mapa. La batalla en curso se descarta (no puntúa ni da medalla), pero las citas ya reveladas se quedan en el Citadex. Como mucho se pierden 2 minutos.

**Final de batalla:** tras la tercera ronda, según la Presión quitada:

| Presión quitada | Resultado |
|---|---|
| 100 % (3 certeras) | Medalla de oro — "El entrevistador se queda sin preguntas" |
| ≥ 2/3 | Medalla de plata |
| ≥ 1/3 | Medalla de bronce |
| menos | Sin medalla — "Tema explorado"; se invita a repetir |

**Repetir un tema:** siempre permitido. Cada tema tiene un banco de **3 a 6 preguntas**; cada batalla usa 3, dando prioridad a las que el jugador aún no ha visto. Se conserva la mejor medalla y la mejor puntuación.

**Repaso final** (opcional): aparece en el mapa cuando se han explorado todos los temas. Una batalla de 5 rondas con una pregunta de cada tema, sin opción parcial. Es un extra; el juego está completo sin él.

Tipos de ronda, para dar variedad (todos comparten el mismo esquema de datos):

- `choice` — elegir la respuesta real entre 4 (el tipo base).
- `complete` — completar la cita: la frase real con un hueco y 4 opciones.
- `true_false` — "¿Dijo esto?": una afirmación, verdadero/falso.
- `order` — ordenar 3–4 ideas en el orden en que las expuso (para respuestas largas).

### Puntuación

| Concepto | Puntos |
|---|---|
| Respuesta real | +100 |
| Respuesta parcial | +40 |
| Respuesta falsa | 0 |
| Racha dentro de la batalla | ×1.5 la 2.ª certera seguida, ×2 la 3.ª |
| Batalla perfecta (oro) | +100 |
| Ronda en la que se usa un objeto | la respuesta real vale 60 y no cuenta para la racha |

- Máximo por batalla: 100 + 150 + 200 + 100 = **550**.
- **Puntuación total** = suma de la **mejor** puntuación de cada tema (repetir sirve para mejorar, no para acumular).
- **Exploración** = temas jugados / temas totales.
- **Fidelidad** = respuestas certeras / preguntas respondidas, contando solo la mejor batalla de cada tema. Junto con la exploración, es la métrica estrella: cuánto conoce el jugador la entrevista.
- **Rango final**, según temas con medalla de plata u oro sobre el total: Oyente despistado (< 25 %) → Oyente atento (≥ 25 %) → Cronista (≥ 60 %) → Portavoz oficial (100 %). Así el rango premia a la vez explorar y acertar.
- **Objetos**: en cada batalla se dispone de un uso de *Apuntes* (elimina 2 opciones falsas) y uno de *Repregunta* (oír los primeros 5 s del clip de la respuesta antes de elegir). No se acumulan entre batallas.
- Sin temporizador ni bonus de rapidez: se premia entender, no correr.

## Flujo de contenido (audio → juego)

1. **Entrada.** El usuario aporta `content/transcript.md` (preferido) y/o el audio en `assets/audio/interview.<ext>`. Formato ideal de la transcripción: una intervención por párrafo, con hablante y marca de tiempo, p. ej. `[00:03:12] ENTREVISTADOR: …`.
   - Si solo hay audio, transcribirlo primero, guardar el resultado en `content/transcript.md` y **pedir al usuario que revise nombres propios, cifras y hablantes** antes de seguir.
2. **Análisis** → `content/analysis.md`: quién es quién, tono, lista de bloques temáticos en orden con sus marcas de tiempo, y por bloque las preguntas del entrevistador con la idea central de cada respuesta y las mejores citas literales.
3. **Diseño de preguntas** → `content/interview.json` (esquema abajo). Orientación: 6–8 zonas (temas), banco de 3–6 turnos por zona (cada batalla usa 3), 12–16 min de juego completo. Un tema con más de 6 preguntas buenas se divide en dos zonas. Cada turno debe entenderse por sí solo, sin haber jugado otros temas. Priorizar las ideas que definen la postura del entrevistado frente a datos anecdóticos.
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
      "keyIdeas": ["…"],         // se muestran en el resumen de batalla
      "turns": [                 // banco de 3 a 6; cada batalla usa 3
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
  state.js           estado de sesión, puntuación, recuerdo ligero en localStorage
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
- Accesibilidad: todo audio tiene su texto en pantalla; nunca depender solo del color; opción de desactivar las animaciones.

## Comandos

```bash
python3 -m http.server 8000     # servir el juego en local
node --test tests/              # tests de lógica
node tools/validate-content.js  # validar content/interview.json
```

(Actualizar esta sección cuando existan los scripts.)

## Plan de desarrollo

1. **Fase 0 — Contenido.** Recibir transcripción/audio → `analysis.md` → proponer al usuario la lista de zonas y preguntas → `interview.json` validado. *No empezar la fase 1 de contenido real sin el visto bueno del usuario a las zonas.*
2. **Fase 1 — Motor de batalla.** Una batalla de 3 rondas jugable de principio a fin con turnos `choice`, puntuación, medalla, revelación, clip de audio y botón de abandonar. Puede desarrollarse en paralelo con un `interview.sample.json` de contenido ficticio claramente marcado como tal.
3. **Fase 2 — Juego completo.** Título, intro, mapa libre, resumen de batalla, Citadex, "Terminar entrevista" y resultado final, recuerdo ligero en localStorage.
4. **Fase 3 — Variedad.** Tipos `complete`, `true_false`, `order`, objetos, banco de preguntas al repetir, repaso final.
5. **Fase 4 — Pulido.** Arte y sonido originales, animaciones, móvil, accesibilidad, publicación en GitHub Pages.

## Forma de trabajar

- Commits pequeños y descriptivos, en español.
- Antes de dar algo por terminado: tests en verde, validador de contenido en verde y probar el juego en el navegador.
- Ante la duda sobre qué dijo el entrevistado, se consulta la transcripción; si es ambigua, se pregunta al usuario. Nunca se rellena por intuición.
