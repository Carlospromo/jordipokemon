# Fase 2 — Juego jugable

> Prompt para una sesión nueva de Claude Code en este repositorio. Requiere la Fase 1 terminada. Copiar a partir de la línea siguiente.

---

Vas a ejecutar la **Fase 2 (Juego jugable)** del juego descrito en `CLAUDE.md`: el juego completo, de la pantalla de título al resultado final, con todo el contenido real y una presentación funcional pero sin arte definitivo.

## Lee antes de empezar

1. `CLAUDE.md` entero: es la especificación. Secciones clave: «Diseño del juego» y «Arquitectura técnica».
2. `content/interview.json` (ya validado). No lo modifiques salvo para corregir un error, y en ese caso vuelve a pasar el validador.

## Qué tienes que entregar

### Lógica pura (sin DOM), con tests

En `src/battle/` y `src/state.js`:

- **Selección de preguntas**: 3 por batalla, priorizando las no vistas de la zona; orden aleatorio de opciones. El azar se inyecta para poder testearlo.
- **Resolución de ronda**: `real` / `partial` / `false` → daño a la Presión (1/3, 1/6, 0), puntos y racha (×1.5 la 2.ª certera seguida, ×2 la 3.ª), más el bonus de batalla perfecta.
- **Medalla** según la Presión quitada (oro, plata, bronce, ninguna).
- **Progreso**: mejor medalla y mejor puntuación por zona, citas desbloqueadas, preguntas vistas, exploración, fidelidad, puntuación total y rango.
- **Recuerdo en `localStorage`**: una sola clave, ligada a `meta.version`; se escribe al terminar cada batalla; si falla la lectura o la escritura, el juego sigue en memoria sin mostrar errores. Función para borrarlo.
- **Abandono**: descartar la batalla en curso conservando las citas ya reveladas.

Tests en `tests/` con `node --test`: puntuación máxima de 550, cada combinación de medalla, racha rota por una parcial o una falsa, selección sin repetir hasta agotar el banco, progreso que solo mejora, `localStorage` ausente o corrupto.

### Pantallas

Las siete de `CLAUDE.md`, con los tres tipos de ronda (`choice`, `complete`, `true_false`):

1. **Título**.
2. **Intro** (saltable), con `meta.intro`.
3. **Mapa**: las 10 zonas abiertas, numeradas, con su medalla o «sin explorar»; cabecera con temas explorados y puntuación total; accesos a Citadex, «Terminar entrevista» y «Borrar progreso» (con confirmación).
4. **Batalla**: rival arriba a la derecha, jugador abajo a la izquierda, barra de Presión, «Ronda n/3», caja de diálogo con efecto máquina de escribir saltable, menú de opciones, mensaje de resolución, revelación con la cita y el contexto, y botón «Mapa» con confirmación.
5. **Resumen de batalla**: medalla, puntos, las 3 citas, ideas clave; «Volver al mapa», «Siguiente tema» y «Repetir».
6. **Citadex**: citas por zona; «???» en las no desbloqueadas.
7. **Resultado final**: exploración, fidelidad, puntuación, medallas, rango, zonas no jugadas solo con su título, `meta.closing`, y vuelta al mapa.

### Presentación en esta fase

- Lienzo lógico de 480×320 escalado al ancho disponible; usable en móvil vertical (táctil, botones de al menos 44 px) y con teclado (flechas, Enter, Escape para «Mapa»).
- Estilo retro hecho solo con CSS: paleta limitada, bordes de píxel, tipografía pixel de licencia libre o monoespaciada del sistema. Los personajes pueden ser siluetas o marcadores sencillos; el arte definitivo es de la Fase 3.
- Sin audio. Si una pregunta no tiene `clip`, la revelación muestra solo el texto.
- Nada que copie la interfaz, tipografía, sprites o sonidos de Pokémon ni de otra franquicia.

## Restricciones técnicas

- HTML + CSS + módulos ES, sin framework, sin paso de build y sin dependencias de ejecución. Debe funcionar servido desde un subdirectorio (rutas relativas), porque se publicará en GitHub Pages.
- El motor no contiene ningún texto de la entrevista: todo sale de `content/interview.json`.
- Sin temporizadores de respuesta. Opción para desactivar animaciones y respeto a `prefers-reduced-motion`.

## Hecho cuando

- `node --test tests/` y `node tools/validate-content.js` pasan.
- Con el juego servido en local (`python3 -m http.server 8000`) has comprobado con Playwright (Chromium ya está instalado; no instales otro), a 390×844 y a 1280×800:
  - una partida completa de una zona con 3 certeras (oro, 550 puntos);
  - una batalla con fallos (medalla inferior y cita revelada igualmente);
  - abandono a mitad de batalla (sin puntos, citas conservadas en el Citadex);
  - recarga de la página (progreso recordado) y «Borrar progreso»;
  - «Terminar entrevista» con solo 2 zonas jugadas;
  - un tipo `complete` y un `true_false`;
  - la consola sin errores.
- Has enviado al usuario capturas del mapa, de una batalla y del resultado final, y un resumen de lo que queda para la Fase 3.

## Fuera de alcance

Arte y sonido definitivos, clips de audio, objetos (*Apuntes*, *Repregunta*), repaso final, publicación.
