# Sensor de ambiente (luz)

El usuario tapa o destapa la cámara del teléfono con la mano y la pantalla del computador refleja en tiempo real si hay luz, penumbra o sombra. El fondo cambia de color (amarillo, gris, negro) y un ícono grande pasa de ☀️ a 🌥️ a 🌑.

## Materiales

- Smartphone (iPhone o Android con cámara)
- Computador con navegador Chrome o Safari
- Base A1 (Soporte vertical) o cualquier soporte que mantenga el teléfono apuntando hacia el espacio que se quiere monitorear
- No requiere construcción adicional

## Cómo usar

1. Coloca el teléfono sobre la Base A1, con la **cámara trasera apuntando hacia adelante** (hacia el espacio donde se interactuará).
2. Abre [la demo en vivo](https://amandawoodp.github.io/physical-viz-toolkit/artefactos/12-ambiente/) en el computador.
3. Click en "+ Conectar teléfono". Aparece un código QR.
4. Escanea el QR con el iPhone/Android y permite el acceso a la cámara.
5. **Calibración en dos toques**:
   - Con la cámara viendo el ambiente normal → toca **"☀️ CON LUZ NORMAL"**.
   - Tapa la cámara con la mano → toca **"🌑 TAPANDO LA CÁMARA"**.
6. Suelta. Tapa y destapa la cámara. La pantalla del PC alterna entre LUZ, PENUMBRA y SOMBRA con cambios de fondo y de ícono.

## Componente Protobject

`Protobject.LightSensor` — utiliza la cámara del teléfono para medir el brillo promedio de la imagen. No es un sensor de luz "puro" en el sentido tradicional: es la cámara analizando frame a frame qué tan brillante está la escena.

## Sensor y mapeo de datos

`LightSensor.onData(brightness)` entrega un número de brillo (típicamente 0-255). El código aplica suavizado exponencial para evitar parpadeo, divide el rango calibrado entre los dos extremos en tres tercios y clasifica cada lectura en uno de tres estados: **luz**, **penumbra** o **sombra**.

El estudiante final solo recibe el evento semántico `{ estado, brillo }`, nunca el flujo crudo de brillos.

## Usos típicos

- **Detector de presencia**: pasar la mano cerca del teléfono activa o desactiva una visualización.
- **Día y noche**: cambiar la metáfora visual al apagar la luz de la habitación.
- **Caja sorpresa**: meter el teléfono dentro de una caja con tapa, abrir la tapa = luz, cerrar = sombra.
- **Sensor de cercanía aproximada**: aunque no es un sensor de profundidad, acercar un objeto a la cámara reduce el brillo y se puede usar como "alguien está cerca".

## Notas

- **El sensor usa la cámara**, así que no funciona bien al mismo tiempo que otros artefactos que usen la cámara (slider, dado).
- Buena iluminación general en el espacio: si la sala está poco iluminada de base, el rango entre "luz" y "sombra" es chico y los tres estados quedan muy cerca.
- La calibración es **sensible al ambiente**: si la luz del lugar cambia (alguien enciende una lámpara, baja el sol), conviene recalibrar.
- Requiere acceso a la cámara, pero **no** requiere permiso especial de orientación.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.