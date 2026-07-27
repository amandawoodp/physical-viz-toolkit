# Sensor de ambiente (luz)

El usuario tapa o destapa la cámara del teléfono con la mano y la pantalla del computador refleja en tiempo real si hay luz, penumbra o sombra. El fondo cambia de color (amarillo, gris, negro) y un ícono grande pasa de ☀️ a 🌥️ a 🌑.

## Materiales

- Smartphone (iPhone o Android con cámara)
- Computador con navegador Chrome o Safari
- Base A1 (Soporte vertical) o cualquier soporte que mantenga el teléfono apuntando hacia el espacio que se quiere monitorear

## Cómo usar

1. Coloca el teléfono sobre la Base A1, con la **cámara trasera apuntando hacia adelante** (hacia el espacio donde se interactuará).
2. Abre la demo en vivo en el computador.
3. Click en "+ Conectar teléfono". Aparece un código QR.
4. Escanea el QR con el iPhone/Android y permite el acceso a la cámara.
5. Espera a que el valor de brillo empiece a mostrarse en el teléfono.
6. **Calibración en dos toques**:
   - Con la cámara viendo el ambiente normal → toca **"☀️ CON LUZ NORMAL"**.
   - Tapa la cámara con la mano → toca **"🌑 TAPANDO LA CÁMARA"**.
7. Suelta. Tapa y destapa la cámara. La pantalla del PC alterna entre LUZ, PENUMBRA y SOMBRA con cambios de fondo y de ícono.

## Sensor Protobject utilizado

Este artefacto usa Protobject para conectar el teléfono con la pantalla del computador, pero la medición de luz **no** depende de un sensor de luz nativo (`Protobject.LightSensor`): `sensor.html` accede directamente a la cámara con `getUserMedia()`, dibuja cada frame en un `<canvas>` oculto y calcula el brillo promedio de sus píxeles.

El teléfono toma lecturas periódicas (cada `INTERVALO_MS`) y calcula un número de brillo promedio, típicamente entre 0 y 255. El código aplica suavizado exponencial para evitar parpadeo, divide el rango calibrado entre los dos extremos en tres tercios y clasifica cada lectura en uno de tres estados: **luz**, **penumbra** o **sombra**. El estudiante final solo recibe el evento semántico `{ estado, brillo }`, nunca el flujo crudo de brillos.

## Cómo adaptarlo a otros usos

El patrón "brillo de la cámara clasificado en niveles calibrados" sirve para cualquier interacción basada en tapar/destapar o cambios de iluminación:

- **Detector de presencia**: pasar la mano cerca del teléfono activa o desactiva una visualización, sin necesitar un sensor de proximidad dedicado.
- **Día y noche**: cambia la metáfora visual de una visualización al apagar la luz de la habitación, simulando un ciclo día/noche.
- **Caja sorpresa**: mete el teléfono dentro de una caja con tapa — abrir la tapa = luz, cerrar = sombra — para revelar contenido al abrir.
- **Sensor de cercanía aproximada**: aunque no es un sensor de profundidad, acercar un objeto a la cámara reduce el brillo y se puede usar como señal de "algo está cerca".

Para adaptarlo, cambia qué representa cada estado (`luz`/`penumbra`/`sombra`) en `index.html`; la captura de cámara y clasificación en tercios de `sensor.html` no cambian.

## Parámetros ajustables

Ambos están en `sensor.html`:

- **`SUAVIZADO`** (default 0.3, rango 0–1): suavizado exponencial del brillo leído. Más alto = lectura más estable pero más lenta para reaccionar a cambios reales; más bajo = más sensible pero puede "temblar".
- **`INTERVALO_MS`** (default 200): cada cuántos milisegundos se toma y procesa un frame de la cámara. Bájalo para una respuesta más inmediata; súbelo para ahorrar batería/CPU.

## Notas técnicas

- **El sensor usa la cámara**, así que no funciona bien al mismo tiempo que otros artefactos que usen la cámara (slider, dado).
- Buena iluminación general en el espacio: si la sala está poco iluminada de base, el rango entre "luz" y "sombra" es chico y los tres estados quedan muy cerca.
- La calibración es **sensible al ambiente**: si la luz del lugar cambia (alguien enciende una lámpara, baja el sol), conviene recalibrar.
- Requiere acceso a la cámara, pero **no** requiere permiso especial de orientación.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.
