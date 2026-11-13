# Fase 3 — Pulido y publicación

> Prompt para una sesión nueva de Claude Code en este repositorio. Requiere la Fase 2 terminada. Copiar a partir de la línea siguiente.

---

Vas a ejecutar la **Fase 3 (Pulido y publicación)** del juego descrito en `CLAUDE.md`: darle su aspecto y sonido definitivos, completar las mecánicas que faltan y publicarlo en GitHub Pages.

## Lee antes de empezar

1. `CLAUDE.md` entero.
2. El código de `src/` y `styles/` tal como quedó en la Fase 2. Juega una zona antes de cambiar nada.

## Qué tienes que entregar

### 1. Arte original en pixel art

- Paleta única y limitada para todo el juego.
- Sprites del jugador (de espaldas) y del rival (de frente) para la batalla, y retratos pequeños para los diálogos. Son personas reales: representación sobria y reconocible por rasgos generales (traje, peinado, micrófono de pódcast), **sin caricatura ni rasgos ridiculizantes**, y con el mismo trato para ambos.
- Fondo de batalla (un plató de pódcast), mapa con 10 nodos unidos por un camino, medallas de oro, plata y bronce, iconos de objetos y marco de la caja de diálogo.
- Todo dibujado para este juego (SVG o PNG generados en el repositorio). Nada tomado ni calcado de Pokémon ni de otra franquicia: ni criaturas, ni interfaz, ni tipografía.

### 2. Animación y sonido

- Animaciones breves: entrada de los personajes, golpe y sacudida al acertar, bajada de la barra de Presión, entrega de medalla, transición entre pantallas. Todas se desactivan con la opción de ajustes y con `prefers-reduced-motion`.
- Efectos de sonido originales generados con Web Audio (selección, acierto, fallo, medalla), con botón de silencio visible y recordado. Sin música con derechos.

### 3. Mecánicas pendientes

- **Objetos**, un uso de cada uno por batalla: *Apuntes* (elimina 2 opciones falsas) y *Repregunta* (reproduce los primeros 5 s del clip; sin audio, muestra las primeras palabras de la cita). La ronda en la que se usa un objeto vale 60 y no cuenta para la racha.
- **Repaso final**: aparece en el mapa al explorar las 10 zonas; 5 rondas con preguntas de zonas distintas, sin opción parcial.
- Lógica nueva con sus tests.

### 4. Audio de la entrevista (solo si existe `assets/audio/interview.*`)

- `tools/cut-clips` que corte con ffmpeg cada tramo `source` a `assets/audio/clips/<id>.mp3` (mono, 64 kbps) sin alterar el contenido, y añada `clip` a `interview.json`.
- Reproducción en la revelación y en el Citadex, saltable, siempre con el texto en pantalla.
- Revisa con el audio las citas con `verified: false` y márcalas como verificadas o corrígelas.
- Si no hay audio, omite este apartado y dilo en el resumen final; el juego debe quedar completo sin él.

### 5. Accesibilidad y calidad

- Contraste suficiente; el resultado de cada ronda se comunica con texto e icono, no solo con color.
- Navegación completa por teclado con foco visible; regiones `aria-live` para la caja de diálogo.
- Comprobado en móvil vertical y horizontal, tableta y escritorio.
- Peso total de la página inicial (sin clips) por debajo de 1 MB; los clips se cargan bajo demanda.

### 6. Publicación

- GitHub Pages desde el repositorio, con despliegue automático al actualizar la rama principal. Rutas relativas para que funcione en `/<nombre-del-repositorio>/`.
- `README.md`: qué es el juego, enlace, cómo ejecutarlo en local, cómo cambiar de entrevista y un aviso de que es un proyecto no oficial basado en una entrevista pública, sin relación con los participantes ni con ninguna franquicia de videojuegos.
- Metadatos para compartir (título, descripción, imagen) y favicon.
- **No hagas público nada sin confirmación del usuario**: antes de activar Pages o fusionar en la rama principal, pregúntale y recuérdale que debe contar con permiso para difundir el audio si se incluye.

## Hecho cuando

- `node --test tests/` y `node tools/validate-content.js` pasan.
- Has repetido con Playwright la batería de la Fase 2 más: uso de cada objeto, repaso final y, si hay audio, reproducción de un clip.
- Has enviado al usuario capturas del título, mapa, batalla y resultado final en móvil y escritorio.
- Tras la confirmación del usuario, la URL pública carga, se juega una zona entera y la consola no muestra errores.

## Fuera de alcance

Cuentas de usuario, clasificaciones en línea, servidor propio, analítica con datos personales.
