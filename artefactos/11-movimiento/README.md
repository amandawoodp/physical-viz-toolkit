# Sensor de movimiento

El usuario sacude, agita o golpea un objeto que tiene el teléfono incorporado. La pantalla del computador muestra una barra vertical que sube y baja en tiempo real con la intensidad del movimiento, y un contador grande que aumenta cada vez que se detecta una sacudida fuerte sostenida.

## Materiales

- Smartphone (iPhone o Android con acelerómetro)
- Computador con navegador Chrome o Safari
- Base B — Cuna con elásticos
- Una pelota de cartón, peluche, cojín o cualquier objeto que pueda sacudirse, sobre el cual se monta la Base B con el teléfono. Para impactos más fuertes se recomienda la Base B acolchada con esponjas.

## Cómo usar

1. Fija el teléfono dentro de la Base B sobre el objeto que se va a sacudir.
2. Abre la demo en vivo en el computador.
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

## Sensor Protobject utilizado

`Protobject.Acceleration` — accede al acelerómetro del teléfono y entrega, cada N milisegundos (`onData`), un vector tridimensional `{ x, y, z }` en m/s².

El código: calcula la **magnitud total** del vector (`sqrt(x² + y² + z²)`); la compara con el valor de **reposo** calibrado (que es ~9.8 m/s², la gravedad terrestre); **normaliza** al rango calibrado (reposo = 0%, sacudida fuerte = 100%); **detecta evento** cuando la intensidad supera el 60% del rango durante al menos `DURACION_MS` continuos; y **aplica cooldown** (`COOLDOWN_MS`) tras cada evento para evitar contar varias veces la misma sacudida.

Lo que se envía al PC son dos tipos de mensajes: `{ tipo: "nivel", intensidad, umbral }` para la barra animada, y `{ tipo: "evento" }` cuando se confirma una sacudida fuerte sostenida. El estudiante final nunca trabaja con los valores crudos del acelerómetro.

## Cómo adaptarlo a otros usos

El patrón "magnitud de movimiento + confirmación de evento sostenido" sirve para cualquier interacción disparada por gesto físico:

- **Objeto que se sacude o lanza**: la Base B acolchada dentro de una pelota de cartón, unas maracas con elementos sueltos, un peluche, un cubo antiestrés — cada sacudida dispara un evento.
- **Base B en el brazo del usuario (vestible)**: el propio gesto corporal se convierte en input — lanzar algo imaginario, dar un golpe al aire, seguir un ritmo.
- **Base B sobre un objeto que recibe impactos**: una caja, un panel, la membrana de un tambor. Cada golpe genera un evento, útil para sonificación o interacción rítmica.
- **Métrica de intensidad emocional**: usa el nivel continuo (`tipo: "nivel"`) en vez del contador de eventos para medir con cuánta fuerza el usuario sacude el objeto, por ejemplo como proxy de "cuán de acuerdo estás".

Para adaptarlo, cambia qué ocurre en `index.html` al recibir `{ tipo: "evento" }` o `{ tipo: "nivel" }`; la detección y calibración en `sensor.html` no dependen de qué signifique la sacudida.

## Parámetros ajustables

Todos están en `sensor.html`:

- **`DURACION_MS`** (default 80): milisegundos que el movimiento debe sostenerse sobre el umbral antes de confirmarse como evento. Más bajo = más sensible; más alto = exige sacudidas más sostenidas.
- **`COOLDOWN_MS`** (default 400): milisegundos de espera tras un evento antes de poder detectar el siguiente. Evita contar varias veces la misma sacudida. Súbelo si una sola sacudida se cuenta como varias.
- **`umbralPct`** (dentro de `onData`, default 60): porcentaje del rango calibrado que un movimiento debe superar para contar como evento. Súbelo si movimientos suaves se cuentan como sacudida; bájalo si cuesta detectarla.

## Notas técnicas

- **El acelerómetro incluye la gravedad**: en reposo la magnitud total es ~9.8 m/s². Por eso la calibración mide la diferencia respecto al reposo y no la aceleración absoluta.
- **En iPhone es obligatorio** tocar el botón "PEDIR PERMISO DE MOVIMIENTO" antes de calibrar. Sin permiso el sensor no entrega datos.
- Para sacudidas violentas (lanzamientos, golpes fuertes), usar la **Base B acolchada** con esponjas o cartón en acordeón alrededor de la cuna para proteger el teléfono.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.
