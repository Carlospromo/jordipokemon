# CLAUDE.md

Guía de trabajo para este repositorio. Léela entera antes de tocar nada.

## Qué es este proyecto

Un videojuego web de **batallas dialécticas por turnos, con estética de anime moderno y cinematográfico en la línea de los JRPG contemporáneos**, cuyo contenido sale íntegramente de **una entrevista real** (audio + transcripción).

- El **jugador encarna al entrevistado**.
- El **entrevistador es el rival**: cada pregunta suya es un "ataque".
- El jugador responde eligiendo entre varios "movimientos" (respuestas). Solo uno refleja **lo que el entrevistado dijo de verdad**.
- Objetivo real del juego: que quien juega **termine sabiendo qué se habló en la entrevista y qué respondió el entrevistado**. La gamificación está al servicio de eso, no al revés.

## Estado actual

- Hay transcripción: `content/transcript.md` (automática, con erratas y atribuciones de voz dudosas). **No hay audio todavía.**
- La entrevista es de Jordi Wild (The Wild Project) a Alberto Núñez Feijóo, candidato del PP, de 1 h 28 min. La transcripción escribe mal el nombre del programa; el usuario debe confirmarlo.
- **Fase 1 terminada:** `content/interview.json` tiene las 10 zonas y las 58 preguntas, y pasa el validador. Hay 10 citas con `verified: false` pendientes de comprobar con el audio.
- **Siguiente: Fase 2** (`docs/prompts/fase-2-juego.md`). Todavía no hay código del juego.

## Reglas innegociables

1. **Fidelidad a la entrevista.** Toda respuesta marcada como correcta, toda cita y todo resumen debe poder rastrearse a un tramo concreto de la transcripción (`source.start` / `source.end`). Si no está en la transcripción, no entra en el juego. Las citas solo corrigen erratas evidentes de la transcripción automática, nunca el sentido; las dudosas llevan `verified: false` hasta comprobarlas con el audio.
2. **No inventar declaraciones.** Las respuestas incorrectas (distractores) son verosímiles pero nunca se presentan como algo que el entrevistado dijo. Tras cada turno se muestra siempre la respuesta real, se acierte o no.
3. **No poner en boca del entrevistado nada ofensivo o dañino** como distractor. Los distractores son errores razonables (matices, cifras, posturas contrarias suaves), no caricaturas.
4. **Arte, nombres, música y textos 100 % originales.** Es un juego "del género", no una copia: nada de personajes, ilustraciones, nombres, tipografías, sonidos ni interfaz calcados de ningún anime, JRPG u otra franquicia concreta. Los nombres de este documento (Citadex, Medallas, etc.) son propios.
5. **Motor y contenido separados.** El motor no contiene ni una frase de la entrevista; todo vive en `content/`. Cambiar de entrevista debe ser cambiar un JSON y unos audios.
6. **Neutralidad y respeto.** Los personajes son personas reales y el tema es político. El juego informa de lo que el entrevistado dijo; no valora si es cierto ni toma partido. Cuando no contestó a una pregunta, se refleja tal cual. Las correcciones de los verificadores se muestran. Representación gráfica sobria, sin caricatura. No se convierten en preguntas ni citas las acusaciones no probadas contra terceros (ver exclusiones en `docs/esquema-juego.md`).
7. **Idioma:** textos del juego y de documentación en español; identificadores de código en inglés.

## Diseño del juego

### Dirección de arte

**Anime moderno y cinematográfico**, inspirado en el anime japonés de alta calidad y en los JRPG contemporáneos. Sustituye por completo a la estética retro de píxel.

- **Personajes:** ilustración de estilo anime con línea limpia y sombreado plano en dos o tres tonos (cel shading), de medio cuerpo en batalla y en retrato en los diálogos. Son personas reales: proporciones adultas y sobrias, reconocibles por rasgos generales, sin caricatura ni rasgos infantilizados.
- **Puesta en escena:** formato panorámico con bandas de cine en los momentos clave, fondos con profundidad (plató de pódcast con focos, bokeh y luz volumétrica), planos que cambian entre pregunta y respuesta, y primeros planos tipo *cut-in* al elegir y al resolver.
- **Impacto:** líneas de velocidad, destellos, barridos de luz y sacudidas breves de cámara al acertar; nada de eso al fallar, solo un plano más frío. Tipografía cinética para los mensajes de resolución.
- **Interfaz:** HUD moderno de JRPG: paneles translúcidos y angulados, tipografía sans geométrica, barras con degradado y brillo, transiciones fluidas. Nada de marcos de píxel ni tipografía de 8 bits.
- **Color:** base nocturna (azules profundos y negro) con dos acentos, uno por personaje, y dorado para medallas y aciertos. Alto contraste en el texto.
- **Mapa:** un recorrido ilustrado por el plató y la ciudad de noche, con los 10 temas como puntos de luz.
- **Técnica:** todo con SVG, CSS y animación web (sin motor ni build). Las ilustraciones son archivos sustituibles en `assets/art/`: si el usuario aporta ilustraciones de mayor calidad, se cambian sin tocar el código.
- **Límites:** inspiración de género, no copia. Ningún personaje, encuadre, interfaz o logotipo reconocible de una obra concreta. Todas las animaciones se desactivan con la opción de ajustes y con `prefers-reduced-motion`.

### Principios de sesión (web, sin partidas guardadas)

El juego vive en una web: no hay cuentas ni partidas guardadas en las que confiar. Todo el diseño parte de ahí.

- **Batallas cortas y autónomas.** Una batalla = un tema = **3 rondas** (3 preguntas), unos 2 minutos. Ninguna batalla depende de otra.
- **Mapa libre.** Todos los temas están abiertos desde el primer momento. El mapa los numera en el orden real de la entrevista como ruta sugerida, pero el jugador entra en el que quiera y en el orden que quiera.
- **El jugador decide cuánto juega.** No hay mínimo. Puede hacer una sola batalla o todas. Juego completo: **10 temas × 3 rondas = 30 preguntas, unos 20 minutos**.
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
3. **Mapa de temas** — el centro del juego; se vuelve aquí tras cada batalla. Cada tema muestra título, número de orden en la entrevista, medalla conseguida (o "sin explorar"). Cabecera con el progreso: "Has explorado 3 de 10 temas", puntuación total y acceso al Citadex. Botones "Terminar entrevista" y "Borrar progreso".
4. **Batalla** — 3 rondas (ver abajo).
5. **Resumen de batalla** — medalla, puntos, las 3 citas reales y las ideas clave del tema. Botones: "Volver al mapa" (principal), "Siguiente tema" (el siguiente sin explorar) y "Repetir".
6. **Citadex** — citas reales desbloqueadas, por tema, con botón para oír el clip original. Las no desbloqueadas aparecen como "???".
7. **Resultado final** — se llega con "Terminar entrevista" en cualquier momento. Muestra temas explorados, fidelidad, puntuación, medallas, rango y un resumen de lo explorado; de los temas no jugados solo se muestra el título, como invitación a volver. Desde aquí se puede regresar al mapa: terminar no borra nada.

### La batalla

Composición cinematográfica: el entrevistador a un lado del plano y el entrevistado al otro, enfrentados sobre el fondo del plató; barra de *Presión* del entrevistador en el HUD, panel de diálogo inferior y menú de 4 respuestas. Indicador "Ronda 1/3" y botón "Mapa". El plano se acerca a quien habla.

Una **ronda**:

1. El entrevistador "ataca": aparece la pregunta real (efecto máquina de escribir, saltable con un toque).
2. El jugador elige uno de **4 movimientos** (respuestas). Orden aleatorio.
3. Resolución:
   - **Respuesta real** → "¡Respuesta certera!": quita 1/3 de la Presión y desbloquea la cita en el Citadex.
   - **Respuesta parcial** (opcional por pregunta: cercana pero imprecisa) → "No es del todo así…": quita 1/6 de la Presión.
   - **Respuesta falsa** → "Eso no fue lo que dijo": la Presión no baja.
4. **Revelación** (siempre): "Lo que realmente dijo:" + cita + una línea de contexto si hace falta + clip de audio si existe (saltable). El juego funciona completo sin audio.

**Abandonar:** el botón "Mapa" pide una confirmación breve y vuelve al mapa. La batalla en curso se descarta (no puntúa ni da medalla), pero las citas ya reveladas se quedan en el Citadex. Como mucho se pierden 2 minutos.

**Final de batalla:** tras la tercera ronda, según la Presión quitada:

| Presión quitada | Resultado |
|---|---|
| 100 % (3 certeras) | Medalla de oro — "El entrevistador se queda sin preguntas" |
| ≥ 2/3 | Medalla de plata |
| ≥ 1/3 | Medalla de bronce |
| menos | Sin medalla — "Tema explorado"; se invita a repetir |

**Repetir un tema:** siempre permitido. Cada tema tiene un banco de **3 a 6 preguntas**; cada batalla usa 3, dando prioridad a las que el jugador aún no ha visto. Se conserva la mejor medalla y la mejor puntuación.

**Repaso final** (opcional): aparece en el mapa cuando se han explorado todos los temas. Una batalla de 5 rondas con preguntas de temas distintos, sin opción parcial. Es un extra; el juego está completo sin él.

Tipos de ronda, para dar variedad (todos comparten el mismo esquema de datos):

- `choice` — elegir la respuesta real entre 4 (el tipo base).
- `complete` — completar la cita: la frase real con un hueco y 4 opciones.
- `true_false` — "¿Dijo esto?": una afirmación, verdadero/falso.

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
- **Objetos**: en cada batalla se dispone de un uso de *Apuntes* (elimina 2 opciones falsas) y uno de *Repregunta* (oír los primeros 5 s del clip de la respuesta antes de elegir; sin audio, ver las primeras palabras de la cita). No se acumulan entre batallas.
- Sin temporizador ni bonus de rapidez: se premia entender, no correr.

## Flujo de contenido (transcripción → juego)

1. **Fuente de verdad:** `content/transcript.md`. No se edita; las correcciones de erratas se hacen en las citas.
2. **Mapa de contenido:** `docs/esquema-juego.md` define las 10 zonas, el banco de preguntas (5–6 por zona; cada batalla usa 3), la respuesta real de cada una, su tramo y una cita candidata, además de los criterios y las exclusiones.
3. **Datos del juego:** `content/interview.json` (esquema abajo), generado en la Fase 1 a partir del mapa. Cada pregunta debe entenderse por sí sola, sin haber jugado otros temas.
4. **Validación:** `node tools/validate-content.js` comprueba esquema, una única opción `real` por pregunta, límites de longitud, que `source` cae en una intervención del entrevistado y que la cita se corresponde con ese tramo de la transcripción.
5. **Audio (opcional):** si el usuario aporta `assets/audio/interview.<ext>`, en la Fase 3 se cortan los tramos `source` a `assets/audio/clips/<id>.mp3` sin editar su contenido y se revisan las citas con `verified: false`.

### Esquema de `content/interview.json`

```jsonc
{
  "meta": {
    "title": "…",
    "interviewee": { "name": "…", "role": "…" },
    "interviewer": { "name": "…", "role": "…" },
    "summary": "…",
    "intro": ["…"],              // cuadros de diálogo de la intro
    "closing": { "text": "…", "source": { "start": "…", "end": "…" } },  // alegato final
    "version": "…",              // liga el progreso recordado al contenido
    "duration": "01:28:20",
    "excluded": [{ "start": "…", "end": "…", "reason": "…" }]  // tramos que no se usan
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
          "type": "choice",      // choice | complete | true_false
          "question": "…",       // pregunta real del entrevistador (puede condensarse)
          "options": [
            { "text": "…", "kind": "real" },
            { "text": "…", "kind": "partial" },
            { "text": "…", "kind": "false" },
            { "text": "…", "kind": "false" }
          ],
          "quote": "…",          // cita de la transcripción (solo erratas corregidas)
          "verified": true,      // false si la transcripción es dudosa
          "context": "…",        // opcional, una línea
          "source": { "start": "00:03:12", "end": "00:03:41" },
          "clip": "assets/audio/clips/z01-t01.mp3"   // opcional, solo si hay audio
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
styles/              estilo anime cinematográfico (variables de color, HUD, animaciones)
assets/
  art/               ilustraciones originales (SVG), sustituibles
  audio/             interview.<ext>, clips/, sfx/
content/
  transcript.md      fuente de verdad
  interview.json
docs/
  esquema-juego.md   mapa de contenido: zonas, preguntas, criterios
  prompts/           un prompt por fase de desarrollo
tools/               validar contenido, cortar clips
tests/               lógica de batalla y puntuación
```

- La lógica de batalla y puntuación es **pura** (sin DOM) y lleva tests.
- Escena panorámica 16:9 que se adapta al ancho disponible; en móvil vertical la escena ocupa la parte superior y el diálogo y las respuestas la inferior. Debe jugarse bien en táctil y en teclado (flechas + Enter).
- Accesibilidad: todo audio tiene su texto en pantalla; nunca depender solo del color; opción de desactivar las animaciones.

## Comandos

```bash
python3 -m http.server 8000     # servir el juego en local
node --test              # tests de lógica
node tools/validate-content.js  # validar content/interview.json
```

Requiere Node 20 o superior. No hay dependencias que instalar.

## Plan de desarrollo

Tres fases. Cada una tiene un prompt autónomo en `docs/prompts/` pensado para lanzarse en una sesión nueva; define entregables, restricciones y criterio de "hecho". No se empieza una fase sin haber cerrado la anterior.

| Fase | Prompt | Resultado |
|---|---|---|
| 1. Contenido | `docs/prompts/fase-1-contenido.md` | `content/interview.json` con las 58 preguntas y el validador |
| 2. Juego jugable | `docs/prompts/fase-2-juego.md` | Juego completo de título a resultado final, con lógica testeada y la interfaz ya en la dirección de arte |
| 3. Pulido y publicación | `docs/prompts/fase-3-pulido-publicacion.md` | Arte anime y puesta en escena cinematográfica definitivos, sonido, objetos, repaso final, clips si hay audio, GitHub Pages |

## Forma de trabajar

- Commits pequeños y descriptivos, en español.
- Antes de dar algo por terminado: tests en verde, validador de contenido en verde y probar el juego en el navegador.
- Ante la duda sobre qué dijo el entrevistado, se consulta la transcripción; si es ambigua, se pregunta al usuario. Nunca se rellena por intuición.
