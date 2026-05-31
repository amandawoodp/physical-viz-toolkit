# Sensor de movimiento

El usuario sacude, agita o golpea un objeto que tiene el teléfono incorporado. La pantalla del computador muestra una barra vertical que sube y baja en tiempo real con la intensidad del movimiento, y un contador grande que aumenta cada vez que se detecta una sacudida fuerte sostenida.

## Materiales

- Smartphone (iPhone o Android con acelerómetro)
- Computador con navegador Chrome o Safari
- Base B — Cuna con elásticos
- Una pelota de cartón, peluche, cojín o cualquier objeto que pueda sacudirse, sobre el cual se monta la Base B con el teléfono. Para impactos más fuertes se recomienda la Base B acolchada con esponjas.

## Cómo usar

1. Fija el teléfono dentro de la Base B sobre el objeto que se va a sacudir.
2. Abre [la demo en vivo](https://amandawoodp.github.io/physical-viz-toolkit/artefactos/11-movimiento/) en el computador.
3. Click en "+ Conectar teléfono". Aparece un código QR.
4. Escanea el QR con el iPhone/Android.
5. Toca **"🤳 PEDIR PERMISO DE MOVIMIENTO"**. iOS pedirá permiso → permítelo.
6. **Calibración en dos toques**:
   - Pon el teléfono quieto sobre la mesa → toca **"🛑 GRABAR REPOSO"**.
   - Sacude el teléfono fuerte y toca **"💥 GRABAR SACUDIDA FUERTE"** mientras lo sacudes (el toque debe coincidir con la sacudida).
7. Suelta. Sacude el objeto con distintas intensidades. En el PC:
   - La barra vertical refleja la magnitud del movimiento.
   - El contador aumenta con cada sacudida fuerte detectada.
   - El fondo destella violeta brevemente al detectar.

## Componente Protobject

`Protobject.Acceleration` — accede al acelerómetro del teléfono y entrega valores en los tres ejes (`x`, `y`, `z`) en m/s² cada N milisegundos.

## Sensor y mapeo de datos

`Acceleration.onData({ x, y, z })` entrega un vector tridimensional. El código:

1. Calcula la **magnitud total** del vector: `sqrt(x² + y² + z²)`.
2. Compara esa magnitud con el valor de **reposo** calibrado (que es ~9.8 m/s², la gravedad terrestre).
3. **Normaliza** al rango calibrado (reposo = 0%, sacudida fuerte = 100%).
4. **Detecta evento** cuando la intensidad supera el 60% del rango durante al menos 80 ms continuos.
5. **Aplica cooldown** de 400 ms tras cada evento para evitar contar varias veces la misma sacudida.

Lo que se envía al PC son dos tipos de mensajes:
- `{ tipo: "nivel", intensidad, umbral }` para la barra animada.
- `{ tipo: "evento" }` cuando se confirma una sacudida fuerte sostenida.

El estudiante final nunca trabaja con los valores crudos del acelerómetro.

## Patrones de uso

- **Objeto que se sacude o lanza**: la Base B acolchada dentro de una pelota de cartón, unas maracas con elementos sueltos, un peluche, un cubo antiestrés.
- **Base B en el brazo del usuario** (vestible): el propio gesto corporal se convierte en input. El acto de lanzar algo imaginario, dar un golpe al aire, seguir un ritmo.
- **Base B sobre un objeto que recibe impactos**: una caja, un panel, la membrana de un tambor. Cada golpe genera un evento.

## Usos típicos

- **Contador de eventos físicos**: cuántas veces el visitante sacude una maraca antes de cansarse.
- **Interacción rítmica**: golpear una caja al compás de algo.
- **Detector de gesto corporal**: la Base B en el brazo lee el momento en que el usuario "lanza" algo invisible.
- **Métrica de intensidad emocional**: ¿con cuánta fuerza sacudes el objeto cuando estás de acuerdo?

## Notas importantes

- **El acelerómetro incluye la gravedad**: en reposo la magnitud total es ~9.8 m/s². Por eso la calibración mide la diferencia respecto al reposo y no la aceleración absoluta.
- **En iPhone es obligatorio** tocar el botón "PEDIR PERMISO DE MOVIMIENTO" antes de calibrar. Sin permiso el sensor no entrega datos.
- Si los eventos se disparan demasiado rápido o no se disparan, ajustar `DURACION_MS` (más corto = más sensible) y `COOLDOWN_MS` (más largo = menos disparos seguidos) en `sensor.html`.
- Para sacudidas violentas (lanzamientos, golpes fuertes), usar la **Base B acolchada** con esponjas o cartón en acordeón alrededor de la cuna para proteger el teléfono.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.