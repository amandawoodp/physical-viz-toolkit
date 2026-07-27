# Sensor de ruido

El usuario aplaude, sopla, grita o hace cualquier sonido fuerte cerca del teléfono. La pantalla del computador muestra una barra vertical que sube y baja en tiempo real con la intensidad del sonido, y un contador grande que aumenta cada vez que se detecta un "sonido fuerte" — es decir, un sonido que supera el umbral durante al menos 80 milisegundos.

## Materiales

- Smartphone (iPhone o Android con micrófono)
- Computador con navegador Chrome o Safari
- Base A1 (Soporte vertical) o cualquier soporte
- Opcional: cartel de cartón al lado del teléfono que diga "APLAUDE AQUÍ" o "SOPLA AQUÍ" (affordance visual)

## Cómo usar

1. Coloca el teléfono sobre la Base A1, con el micrófono apuntando hacia donde se interactuará.
2. Abre la demo en vivo en el computador.
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

## Sensor Protobject utilizado

`Protobject.NoiseSensor` — captura audio del micrófono del teléfono y entrega, cada N milisegundos (`onData`), un número de intensidad acústica.

El código: **normaliza** esa intensidad al rango calibrado (ruido ambiente = 0%, sonido fuerte = 100%); **detecta evento** cuando la intensidad supera el 60% del rango durante al menos `DURACION_MS` continuos; y **aplica cooldown** (`COOLDOWN_MS`) tras cada evento para evitar contar varias veces el mismo aplauso.

Lo que se envía al PC son dos tipos de mensajes: `{ tipo: "nivel", intensidad, umbral }` para la barra animada, y `{ tipo: "evento" }` cuando se confirma un sonido fuerte sostenido. El estudiante final nunca trabaja con la amplitud cruda del audio.

## Cómo adaptarlo a otros usos

El patrón "intensidad continua + confirmación de evento sostenido" sirve para cualquier interacción disparada por sonido:

- **Interacción teatral**: "aplaude para activar la siguiente escena" — cada evento avanza una narrativa o dispara una animación.
- **Encuesta o votación colectiva**: "aplaude si estás de acuerdo, el más fuerte gana" — usa el nivel de intensidad (`tipo: "nivel"`) en vez del contador de eventos para medir entusiasmo relativo.
- **Vela apagable**: sopla cerca del teléfono para "apagar" una vela virtual — un evento dispara la animación de apagado.
- **Indicador de ambiente**: usa el nivel continuo (sin contar eventos) para medir el ruido de una sala a lo largo del tiempo, de vacía a llena.

Para adaptarlo, cambia qué ocurre en `index.html` al recibir `{ tipo: "evento" }` o `{ tipo: "nivel" }`; la detección y calibración en `sensor.html` no dependen de qué signifique el sonido.

## Parámetros ajustables

Todos están en `sensor.html`:

- **`DURACION_MS`** (default 80): milisegundos que el sonido debe sostenerse sobre el umbral antes de confirmarse como evento. Más bajo = más sensible (detecta sonidos más cortos); más alto = exige sonidos más sostenidos.
- **`COOLDOWN_MS`** (default 400): milisegundos de espera tras un evento antes de poder detectar el siguiente. Evita contar varias veces el mismo aplauso por su eco o vibración. Súbelo si un solo aplauso se cuenta como varios.
- **`umbralPct`** (dentro de `onData`, default 60): porcentaje del rango calibrado que un sonido debe superar para contar como evento. Súbelo si se detectan sonidos de fondo como eventos; bájalo si cuesta que se detecte un aplauso real.

## Notas técnicas

- **Solo mide intensidad**, no reconoce palabras ni tipos de sonido. Para reconocimiento de voz hay otro componente (`AudioClassifier`).
- **En entornos ruidosos** (feria, sala con eco), el ambiente puede ser tan alto que cuesta diferenciar un evento. Calibrar in situ es obligatorio.
- **Acompaña con un letrero de affordance**: el visitante necesita saber qué hacer. Un cartón pegado al lado que diga "APLAUDE AQUÍ" funciona perfecto.
- En iPhone, el primer toque al botón "INICIAR MICRÓFONO" dispara el cuadro de permiso. Tras permitir, el micrófono queda activo hasta que se cierre la pestaña.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.
