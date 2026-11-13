# Esquema del juego

Mapa de contenido del juego, extraído de `content/transcript.md`. Las reglas de juego (rondas, puntuación, medallas, guardado) están en `CLAUDE.md` y no se repiten aquí: este documento define **qué se pregunta** y **de dónde sale cada respuesta**.

## 1. Ficha de la entrevista

| | |
|---|---|
| Entrevistado (jugador) | Alberto Núñez Feijóo, candidato del Partido Popular a la presidencia del Gobierno |
| Entrevistador (rival) | Jordi, presentador del pódcast (la transcripción lo llama «The Wallprop»: **nombre del programa por confirmar**) |
| Verificadores | Iván Muñoz y Javier Collado; corrigen datos en directo |
| Contexto | Serie de entrevistas a los candidatos antes de unas elecciones generales, grabada la víspera del inicio de campaña |
| Duración | 1 h 28 min |
| Fuente | Transcripción automática, con errores de nombres, palabras y atribución de voces |

Datos para la **intro** del juego (00:00:00–00:05:44): hay verificadores en el plató; no se pactaron preguntas; Feijóo fue el primer candidato en aceptar la invitación (00:02:25).

## 2. Estructura

- **10 zonas** (temas), en el orden real de la entrevista. Todas abiertas desde el inicio.
- Cada zona tiene un **banco de 5 o 6 preguntas**; cada batalla usa **3**.
- **58 preguntas** en total. Juego completo (una batalla por zona): 30 preguntas, unos 20 minutos.
- **Repaso final** opcional: 5 rondas con preguntas de zonas distintas.
- El **alegato final** del entrevistado (01:26:57–01:28:18) no es pregunta: se muestra como cierre en la pantalla de resultado final.

| N.º | Zona | Tramo | Preguntas |
|---|---|---|---|
| 1 | Vox y los bandos | 00:04:25–00:16:50 | 6 |
| 2 | El Gobierno que formaría | 00:13:48–00:19:20 | 5 |
| 3 | Pensiones y absentismo | 00:19:20–00:28:48 | 6 |
| 4 | Autónomos e impuestos | 00:21:58–00:32:58 | 6 |
| 5 | Deuda y Defensa | 00:32:58–00:40:57 | 6 |
| 6 | Ceuta y Marruecos | 00:40:57–00:49:16 | 6 |
| 7 | Inmigración | 00:49:16–00:57:00 | 6 |
| 8 | La foto y la Gürtel | 00:57:00–01:08:43 | 6 |
| 9 | Koldo y Ayuso | 01:08:43–01:17:50 | 6 |
| 10 | Ráfaga final | 01:18:10–01:25:00 | 5 |

## 3. Criterios de contenido

1. **Respuesta real** = lo que el entrevistado dijo, resumido en una frase corta. No se juzga si es cierto: el juego informa de lo que dijo, no le da ni le quita la razón.
2. **Evasivas**: cuando no contestó a lo que se le preguntaba, la respuesta real lo refleja tal cual («no lo aclara», «no lo sé», «responde con otra cosa»). Es información valiosa para el jugador.
3. **Correcciones de los verificadores**: se muestran en la revelación cuando existen (zona 3).
4. **Citas**: se toman de la transcripción corrigiendo solo erratas evidentes de la transcripción automática (ortografía, nombres propios, palabras mal oídas), nunca el sentido. Las marcadas con ⚠ tienen una transcripción dudosa y deben comprobarse con el audio antes de publicarse.
5. **Excluido del juego**: la insinuación sobre la financiación de las primarias de Pedro Sánchez (01:02:23–01:08:29). Es una acusación no probada contra un tercero que el propio entrevistador cuestiona; no se convierte en pregunta ni en cita. Tampoco se usan como cita las líneas de «Voz sin identificar».
6. **Distractores**: errores razonables (otra cifra, postura más tajante o más tibia, una medida parecida). Nunca posturas ofensivas ni caricaturas.
7. Cada pregunta se entiende sin haber jugado otras zonas.

## 4. Banco de preguntas

Tipos: `choice` (elegir entre 4), `complete` (completar la cita), `true_false` (¿dijo esto?).

### Zona 1 — Vox y los bandos

Ideas clave: se sitúa fuera de los «bandos» y en la centralidad; discrepa de Vox en Europa y las autonomías; defiende que los pactos autonómicos con Vox han funcionado; culpa a Sánchez de la división.

| Id | Tipo | Tramo | Pregunta | Respuesta real | Cita candidata |
|---|---|---|---|---|---|
| z01-t01 | choice | 00:05:44–00:06:58 | ¿Por qué debería votarte a ti y no a Abascal alguien de derechas? | No pertenece a ningún bando: cree en la centralidad política y se define como reformista | «Yo no pertenezco a ningún bando, yo creo en la centralidad política […] Yo soy un político reformista» ⚠ |
| z01-t02 | choice | 00:07:10–00:07:44 | ¿Cuál es tu mayor discrepancia con Vox? | La idea de Europa y el Estado de las autonomías | «La idea de Europa yo no la comparto. El Estado de las autonomías, en el que ellos no creen, yo sí creo» |
| z01-t03 | choice | 00:08:28–00:09:00 | ¿Quién alimenta la política de bandos? | Pedro Sánchez, de quien dice que vive de la fractura | «Hay un político en España que ha vivido y sigue viviendo de la fractura y del bando» |
| z01-t04 | true_false | 00:09:54–00:10:36 | ¿Dijo que votó a Felipe González en 1982? | Verdadero | «Yo he votado a Felipe González en 1982, es conocido» |
| z01-t05 | choice | 00:14:44–00:15:34 | ¿Hay una exigencia de Vox ante la que preferirías no ser presidente? | No se plantea ese supuesto: los pactos autonómicos se han hecho con un documento marco que se ha respetado | «No me planteo ese supuesto, porque ya tenemos una experiencia acreditada» |
| z01-t06 | choice | 00:15:34–00:16:26 | ¿Entiendes que un pacto con Vox preocupe a mucha gente? | Entiende la preocupación, pero dice que en los gobiernos autonómicos con Vox no han tenido ningún problema en esta etapa | «Puedo entender perfectamente la preocupación; lo que sí puedo acreditar es que […] no hemos tenido ningún problema en esta nueva etapa» |

### Zona 2 — El Gobierno que formaría

Ideas clave: tiene ministerios innegociables pero no los revela; gobierno de 14 o 15 ministerios; sin ministerio de Igualdad ni de Vivienda como tales; austeridad en altos cargos.

| Id | Tipo | Tramo | Pregunta | Respuesta real | Cita candidata |
|---|---|---|---|---|---|
| z02-t01 | choice | 00:12:54–00:13:48 | ¿Tienes ministerios innegociables en un pacto? | Sí los tiene, pero no dice cuáles: no es el momento y no desvela su estrategia de negociación | «Jordi, sí lo tengo» / «creo que no es el momento» |
| z02-t02 | choice | 00:13:48–00:14:44 | ¿Qué gobierno necesita España? | Uno decente, competente, rápido, con experiencia y rigor, capaz de aprobar presupuestos | «España necesita un gobierno, primero, decente, competente, rápido, que tenga experiencia, que tenga rigor» |
| z02-t03 | complete | 00:17:08–00:17:22 | «Mi estructura ministerial estará entre ___ ministerios» | 14 y 15 (frente a los 22 actuales) | «Mi estructura ministerial estará entre 14 y 15 ministerios» |
| z02-t04 | choice | 00:16:52–00:18:40 | ¿Quitarás el Ministerio de Igualdad? | No habrá un ministerio de Igualdad como tal: se agrupará con otros y las políticas de igualdad seguirán | «El ministerio de Igualdad se agrupará con otros ministerios […] políticas de igualdad van a seguir» |
| z02-t05 | true_false | 00:18:40–00:19:20 | ¿Dijo que mantendrá un Ministerio de Vivienda porque es la primera prioridad? | Falso: tampoco habrá ministerio de Vivienda, aunque la considera la primera prioridad | «Tampoco va a haber un ministerio de Vivienda, y la vivienda es la primera prioridad para la mayoría de la gente» |

### Zona 3 — Pensiones y absentismo

Ideas clave: fía la viabilidad de las pensiones al crecimiento «sano» y a nuevos cotizantes; se compromete a revalorizarlas con el IPC; jubilación a los 67 sin ampliación obligatoria; ve una bolsa de ahorro en el absentismo.

| Id | Tipo | Tramo | Pregunta | Respuesta real | Cita candidata |
|---|---|---|---|---|---|
| z03-t01 | choice | 00:19:58–00:21:18 | ¿Es sostenible el sistema de pensiones? | Depende de que la economía crezca de forma sana: inversión, empleo y salarios que traigan nuevos cotizantes | «El crecimiento sano de la economía es conseguir mayor inversión […] y hacer una economía tractora que cree empleo de verdad» |
| z03-t02 | choice | 00:22:14–00:22:52 | ¿Te crees los datos de las cuentas públicas? | No: cree que hay falsificación de datos y ocultación de gasto | «Creo que hay una falsificación de datos, creo que hay una ocultación de gasto» |
| z03-t03 | choice | 00:23:04–00:23:26 | ¿A qué te comprometes con las pensiones? | A actualizarlas con el IPC y a buscar la viabilidad del sistema para quienes aún no las cobran | «Yo me comprometo a la actualización de las pensiones de acuerdo con el índice de precios al consumo» |
| z03-t04 | choice | 00:23:30–00:25:14 | ¿Vas a retrasar la edad de jubilación? | No de forma obligatoria: 67 años; quien quiera seguir podrá cobrar parte de la pensión junto al sueldo | «No tenemos previsto ampliar obligatoriamente la edad de jubilación después de los 67» |
| z03-t05 | complete | 00:25:52–00:26:16 | «Año 2018, gasto en absentismo: 13.000 millones. Año 2025: más de ___» | 30.000 millones | «Año 2018, gasto en absentismo […] 13.000 millones; año 2025, más de 30.000 millones» ⚠ |
| z03-t06 | true_false | 00:26:22–00:28:48 | ¿Le corrigieron los verificadores el dato de bajas entre autónomos? | Verdadero: él habló de un 4 %, los verificadores lo situaron en torno al 1 % y agradeció la rectificación | «Te agradezco esa rectificación» ⚠ |

### Zona 4 — Autónomos e impuestos

Ideas clave: quiere bajar impuestos pero antes conocer las cuentas; autónomos pequeños sin IVA; bonificaciones de cuota al contratar y en la maternidad; cuotas opcionales, «complicado»; baja al 100 % en enfermedades graves.

| Id | Tipo | Tramo | Pregunta | Respuesta real | Cita candidata |
|---|---|---|---|---|---|
| z04-t01 | choice | 00:21:58–00:22:20 | ¿Vas a bajar los impuestos? | Su planteamiento es bajarlos, pero dice que antes necesita conocer el estado real de las cuentas | «Mi planteamiento es clarísimo: bajar los impuestos, pero […] necesito [conocer] cómo es el estado de las cuentas» ⚠ |
| z04-t02 | choice | 00:29:36–00:29:52 | ¿Qué harás con el autónomo que lleva años y factura poco? | No facturará IVA, aplicando una directiva europea que el Gobierno no ha transpuesto | «No facturarán IVA y por tanto tendrán un 21 % de margen» |
| z04-t03 | choice | 00:29:52–00:30:36 | ¿Qué ocurre con la cuota si un autónomo contrata? | El autónomo contratado no paga cuota; con un segundo trabajador, la mitad según facturación | «Un autónomo que contrate a otro, ese autónomo contratado no pagará la cuota» |
| z04-t04 | choice | 00:31:02–00:31:24 | ¿Harías opcionales las cuotas de autónomos? | No se compromete: dice que es complicado económicamente | «Es complicado económicamente» |
| z04-t05 | choice | 00:31:30–00:32:14 | ¿Qué «trampa» fiscal atribuye al Gobierno? | No actualizar la tarifa del impuesto de la renta con la inflación | «Han hecho una trampa, que es no actualizar la tarifa del impuesto de la renta con la inflación» |
| z04-t06 | choice | 00:32:14–00:32:58 | ¿Qué propone para las bajas por enfermedades como un cáncer? | Pagar el 100 % en patologías graves, a la vez que se lucha contra el fraude laboral | «En esas patologías absolutamente invalidantes […] debemos de pagar el 100 %» |

### Zona 5 — Deuda y Defensa

Ideas clave: justifica la deuda gallega por un presupuesto heredado y la crisis; sostiene que la deuda se paga y que habría logrado superávit; en Defensa promete auditar y decir a los aliados la verdad.

| Id | Tipo | Tramo | Pregunta | Respuesta real | Cita candidata |
|---|---|---|---|---|---|
| z05-t01 | choice | 00:32:58–00:34:14 | La deuda gallega pasó de 4.000 a 12.000 millones contigo. ¿Cómo lo explicas? | Heredó un presupuesto con 2.000 millones de ingresos que no existían, y Galicia estuvo entre las comunidades que menos aumentaron su deuda | «El presupuesto era falso, los ingresos eran 8.000 y ahí solo había un agujero de 2.000 millones» |
| z05-t02 | complete | 00:34:14–00:34:40 | «Reducimos el ___ de los altos cargos» | 50 % | «En la Xunta de Galicia sobra el 50 % de los altos cargos, y redujimos el 50 % de los altos cargos» ⚠ |
| z05-t03 | choice | 00:36:36–00:37:04 | ¿Es verdad que la deuda no se paga? | No: se paga; cita unos 40.000–42.000 millones anuales de intereses | «¿Cómo que la deuda no se paga? Si la deuda es el mejor negocio de los bancos» |
| z05-t04 | choice | 00:37:14–00:38:22 | ¿Habríais logrado superávit en esta legislatura? | Sí, «sin duda»; recuerda que lo logró en sus últimos presupuestos de Galicia | «Yo he conseguido un superávit en los últimos presupuestos de Galicia» |
| z05-t05 | choice | 00:38:22–00:39:20 | ¿Qué habrías hecho tú en la cumbre de la OTAN? | Decir dentro lo mismo que fuera: pedir más plazo para el 3,5 % y revisarlo en 2029 | «Pido mayor plazo para conseguir el 3,5; en todo caso quedamos en revisarlo en el año 2029» |
| z05-t06 | choice | 00:39:20–00:40:07 | ¿Subirás el gasto en Defensa al 3,5 %? | Hará una auditoría y dirá a los aliados a qué cifra puede llegar, sin enfrentarse ni mentir | «Si no puedo llegar al 2,4, pues me quedaré en el 2,3. Lo que no voy a hacer es mentir» |

### Zona 6 — Ceuta y Marruecos

Ideas clave: habría actuado antes con los informes de inteligencia; contacto con Marruecos, escalada a la UE y despliegue previo del Ejército; responsabiliza a Marruecos; diplomacia con firmeza.

| Id | Tipo | Tramo | Pregunta | Respuesta real | Cita candidata |
|---|---|---|---|---|---|
| z06-t01 | choice | 00:41:38–00:42:25 | ¿Qué habrías hecho primero ante la crisis de Ceuta? | Hacer caso a los informes de inteligencia y de la Policía y contactar con el Gobierno marroquí | «Primero, hacerle caso a los informes del CNI» ⚠ |
| z06-t02 | choice | 00:42:25–00:43:20 | ¿Y si Marruecos no responde? | Escalar el asunto a la Unión Europea y, en último término, avisar de que despliega el Ejército en la frontera | «Avisaría a Marruecos de que yo voy a desplegar el Ejército en la frontera» |
| z06-t03 | choice | 00:43:20–00:44:44 | ¿Darías orden de disparar si hiciera falta? | No lo contesta: lo llama «una trampa» y dice que el Ejército se despliega antes de la invasión | «Eso es una trampa […] el Ejército hay que desplegarlo con anterioridad, obviamente, a la invasión» |
| z06-t04 | choice | 00:45:28–00:45:49 | ¿Quién es el responsable? | Marruecos, por acción, por omisión o por ambas | «Marruecos, claro. Por acción o por omisión, o por las dos cosas» ⚠ |
| z06-t05 | choice | 00:46:37–00:47:18 | ¿Qué gestos diplomáticos echó en falta? | Llamar a consultas al embajador en Rabat y convocar a la embajadora de Marruecos | «Lo primero es llamar a consultas a tu embajador en Rabat» |
| z06-t06 | choice | 00:47:18–00:49:16 | ¿Qué hacemos con Marruecos si se demuestra su participación? | Diplomacia con firmeza y mecanismos de la UE, incluidos los acuerdos comerciales; si se repite, una crisis sin precedentes | «La lealtad y la buena vecindad […] pero la firmeza es innegociable» ⚠ |

### Zona 7 — Inmigración

Ideas clave: esquiva primero la «prioridad nacional»; la nacionalidad como único criterio es ilegal en la UE; arraigo y aportación; itinerario de empleo para el ingreso mínimo vital; retorno de quien entre de forma irregular; legalizar al que trabaja en negro.

| Id | Tipo | Tramo | Pregunta | Respuesta real | Cita candidata |
|---|---|---|---|---|---|
| z07-t01 | choice | 00:49:16–00:49:51 | ¿Quién tiene prioridad: un español que nunca cotizó o un extranjero que lleva 20 años cotizando? | De entrada no contesta: responde que la prioridad nacional es cambiar el Gobierno | «La prioridad nacional es cambiar el gobierno» |
| z07-t02 | choice | 00:50:19–00:51:02 | ¿Qué pedirás a quien venga a España? | Arraigo, aportar, aprender el idioma, respetar las leyes e integrarse | «Voy a pedirle que venga a España a aportar, aprender nuestro idioma, respetar nuestras leyes e integrarse socialmente» |
| z07-t03 | choice | 00:51:07–00:52:10 | ¿Qué pesa más, la nacionalidad o la cotización? | La nacionalidad como único requisito es ilegal en la UE; se puntuarán criterios objetivos como los años de censo | «Lo hemos estudiado. La conclusión es que es ilegal» |
| z07-t04 | choice | 00:52:10–00:52:52 | ¿Quitarás el ingreso mínimo vital a quien no haya trabajado? | Fijará un camino hacia el empleo con obligación de aceptarlo; si se rechaza de forma reiterada, la ayuda baja hasta cero | «Se le irá disminuyendo la ayuda hasta el cero» |
| z07-t05 | choice | 00:52:52–00:54:24 | ¿A quién enviarías a un tercer país? | A quien entre de forma irregular, en línea con el reglamento europeo de retorno | «¿Que entren de forma irregular? Yo no voy a hacer distinciones» |
| z07-t06 | choice | 00:54:24–00:55:04 | ¿Y el inmigrante que trabaja en negro? | Es partidario de legalizarlo y de sancionar al empleador | «Yo soy partidario de legalizar a un señor que tiene un contrato en negro» |

### Zona 8 — La foto y la Gürtel

Ideas clave: dice que conoció a Marcial Dorado cuando no se le vinculaba con el narcotráfico y que cortó la relación; lo explicó en el Parlamento gallego; sobre la Gürtel admite vergüenza, pero no sabe si habría pedido la dimisión de Rajoy.

| Id | Tipo | Tramo | Pregunta | Respuesta real | Cita candidata |
|---|---|---|---|---|---|
| z08-t01 | choice | 00:58:26–00:59:35 | ¿Qué sabías de Marcial Dorado cuando lo conociste? | Que no tenía nada que ver con el narcotráfico; lo que había habido era contrabando de tabaco | «Conocí a esta persona cuando no tenía nada que ver con el narcotráfico» |
| z08-t02 | choice | 01:00:30–01:01:14 | ¿Cómo empezó y cómo acabó esa relación? | Se lo presentó un compañero de la Xunta y cortó al ver que tenía un juicio pendiente por contrabando | «Esta persona me la presentó un compañero de la Xunta de Galicia» |
| z08-t03 | choice | 00:58:26–00:58:57 | ¿Qué hiciste cuando salieron las fotos? | Pidió comparecer en el Parlamento gallego y lo explicó allí, en 2013 | «En cuanto salieron unas fotos, yo he pedido comparecer en el Parlamento» |
| z08-t04 | complete | 00:59:59–01:00:24 | «Yo soy responsable de mi ___. Respondo por ella» | biografía | «Yo soy responsable de mi biografía. Respondo por ella» |
| z08-t05 | choice | 01:04:31–01:05:30 | ¿Cómo valoras el caso Gürtel? | Se juzgó, le costó el Gobierno al PP y dice que le repugnó la actitud del tesorero | «Si nos costó el gobierno» / «me repugnaba la actitud del tesorero de mi partido» ⚠ |
| z08-t06 | choice | 01:07:00–01:07:34 | ¿Habrías pedido la dimisión de Rajoy por la Gürtel? | Dice que no lo sabe: tendría que ver los datos, y recuerda que a Rajoy nadie lo pudo implicar | «No lo sé, te lo digo claramente» |

### Zona 9 — Koldo y Ayuso

Ideas clave: resta importancia a los contactos entre abogados y niega cualquier oferta de dinero del PP; Ayuso es un activo y el PP no está dividido; evita valorar el precio del piso.

| Id | Tipo | Tramo | Pregunta | Respuesta real | Cita candidata |
|---|---|---|---|---|---|
| z09-t01 | choice | 01:08:43–01:10:32 | ¿Qué sabes de la reunión del abogado del PP con el de Koldo? | Que los contactos entre abogados son normales y que él no sabe con cuáles habla el del partido | «No tengo ni idea de con qué abogados habla el abogado que está representando al PP» ⚠ |
| z09-t02 | true_false | 01:10:32–01:10:59 | ¿Dijo que ese abogado ya está fuera del partido? | Falso: sigue en el partido; reforzaron el equipo con abogados penalistas | «No, está con nosotros» |
| z09-t03 | choice | 01:11:00–01:12:21 | ¿Ofreció el PP dinero a Koldo? | Lo niega, anuncia acciones contra quien lo publicó y recuerda que el PP pidió 30 años de cárcel para él | «No hay ningún ofrecimiento de dinero de mi partido a nadie» |
| z09-t04 | choice | 01:12:23–01:14:27 | ¿Qué opinas de Ayuso? | Es un activo del partido; niega que hayan conseguido dividir al PP | «Ayuso es un activo de mi partido, la respuesta es sí» |
| z09-t05 | complete | 01:14:29–01:15:04 | «Somos estilos distintos, por supuesto. Pero el PP no es una ___» | secta | «El PP no es una secta» |
| z09-t06 | choice | 01:15:06–01:16:48 | ¿Te parece normal pagar 6,7 millones por ese inmueble? | No valora el precio: dice que no quiere hablar de eso para no mentir y lo compara con otras sedes | «Yo no quiero hablar de eso, porque no quiero mentir» |

### Zona 10 — Ráfaga final

Ideas clave: admite que no sabe inglés; no quiere llegar al servicio militar obligatorio; ve más riesgo en la frontera sur; retratos breves de Trump, Abascal y Sánchez.

| Id | Tipo | Tramo | Pregunta | Respuesta real | Cita candidata |
|---|---|---|---|---|---|
| z10-t01 | complete | 01:18:10–01:18:22 | «Yo no sé inglés, pero sé ___» | gobernar | «Yo no sé inglés, pero sé gobernar» |
| z10-t02 | choice | 01:18:22–01:19:40 | ¿Debe un presidente saber inglés? | Sí debería; reconoce que no es su caso y que no ha hecho ningún esfuerzo | «Un presidente o primer ministro español debería de saber inglés. No es mi caso» |
| z10-t03 | choice | 01:19:40–01:21:21 | ¿Promoverás el servicio militar obligatorio? | No quiere llegar a eso; advierte del riesgo en las fronteras, sobre todo la sur | «Yo no quiero llegar a eso» |
| z10-t04 | choice | 01:21:21–01:22:19 | Define a Donald Trump | No entiende muchas cosas que dice y hace, pero no tiene interés en llevarse mal con Estados Unidos | «Yo vivo de defender a mi país, no de meter a mi país en un problema» ⚠ |
| z10-t05 | choice | 01:22:49–01:24:02 | Define a Abascal | Le reconoce el mérito de crear un partido y hacerlo tercera fuerza, y presume de que Vox no entró en Galicia | «Ha hecho algo que no es fácil, que es construir un partido político […] y convertirse en la tercera fuerza política del país» |

Material extra sin pregunta propia (para ideas clave o Citadex): definición de Colau (01:22:26), definición de Sánchez como «una gran decepción» (01:24:07) y alegato final (01:26:57).

## 5. Pendiente de confirmar con el usuario

1. Nombre exacto del programa y del entrevistador tal como deben aparecer en el juego.
2. Las 10 zonas y sus títulos.
3. Si habrá **audio**. Sin audio el juego funciona solo con texto; con audio se añaden los clips y se revisan las citas ⚠.
4. Revisión de las citas ⚠ (11) contra el audio.
