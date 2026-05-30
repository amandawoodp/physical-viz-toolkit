# Sensor de ruido

El usuario aplaude, sopla, grita o hace cualquier sonido fuerte cerca del teléfono. La pantalla del computador muestra una barra vertical que sube y baja en tiempo real con la intensidad del sonido, y un contador grande que aumenta cada vez que se detecta un "sonido fuerte" — es decir, un sonido que supera el umbral durante al menos 80 milisegundos.

## Materiales

- Smartphone (iPhone o Android con micrófono)
- Computador con navegador Chrome o Safari
- Base A1 (Soporte vertical) o cualquier soporte
- Opcional: cartel de cartón al lado del teléfono que diga "APLAUDE AQUÍ" o "SOPLA AQUÍ" (affordance visual)

## Cómo usar

1. Coloca el teléfono sobre la Base A1, con el micrófono apuntando hacia donde se interactuará.
2. Abre [la demo en vivo](https://amandawoodp.github.io/physical-viz-toolkit/artefactos/10-ruido/) en el computador.
3. Click en "+ Conectar teléfono". Aparece un código QR.
4. Escanea el QR con el iPhone/Android.
5. Toca **"🎤 INICIAR MICRÓFONO"**. iOS pedirá permiso de micrófono → permítelo.
6. **Calibración en dos toques**:
   - Quédate en silencio → toca **"🤫 GRABAR RUIDO AMBIENTE"**.
   - Aplaude justo cuando toques **"👏 GRABAR SONIDO FUERTE"** (el aplauso debe coincidir con el toque).
7. Suelta. Aplaude, sopla, grita. En el PC:
   - La barra vertical refleja la intensidad en tiempo real.
   - El contador aumenta con cada sonido fuerte detectado.
   - El fondo se pone amarillo brevemente al detectar.

## Componente Protobject

`Protobject.NoiseSensor` — captura audio del micrófono del teléfono y entrega un valor de intensidad acústica cada N milisegundos.

## Sensor y mapeo de datos

`NoiseSensor.onData(intensity)` entrega un número de intensidad. El código:

1. **Normaliza** la intensidad al rango calibrado (ruido ambiente = 0%, sonido fuerte = 100%).
2. **Detecta evento** cuando la intensidad supera el 60% del rango durante al menos 80 ms continuos.
3. **Aplica cooldown** de 400 ms tras cada evento para evitar contar varias veces el mismo aplauso.

Lo que se envía al PC son dos tipos de mensajes:
- `{ tipo: "nivel", intensidad, umbral }` para la barra animada.
- `{ tipo: "evento" }` cuando se confirma un sonido fuerte sostenido.

El estudiante final nunca trabaja con la amplitud cruda del audio.

## Usos típicos

- **Interacción teatral**: "aplaude para activar la siguiente escena".
- **Encuesta colectiva**: "aplaude si estás de acuerdo, el más fuerte gana".
- **Vela apagable**: sopla cerca del teléfono para apagar una vela virtual.
- **Indicador de ambiente**: medir nivel de ruido durante una visita (de la sala vacía a la sala llena).

## Notas importantes

- **Solo mide intensidad**, no reconoce palabras ni tipos de sonido. Para reconocimiento de voz hay otro componente (`AudioClassifier`).
- **En entornos ruidosos** (feria, sala con eco), el ambiente puede ser tan alto que cuesta diferenciar un evento. Calibrar in situ es obligatorio.
- **Acompaña con un letrero de affordance**: el visitante necesita saber qué hacer. Un cartón pegado al lado que diga "APLAUDE AQUÍ" funciona perfecto.
- Si los eventos se disparan demasiado rápido o no se disparan, ajustar `DURACION_MS` (más corto = más sensible) y `COOLDOWN_MS` (más largo = menos disparos seguidos) en `sensor.html`.
- En iPhone, el primer toque al botón "INICIAR MICRÓFONO" dispara el cuadro de permiso. Tras permitir, el micrófono queda activo hasta que se cierre la pestaña.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.