# Perilla giratoria

El usuario gira el teléfono sobre la mesa como si fuera una perilla. La pantalla del computador muestra el ángulo girado desde la posición inicial, el sentido de la rotación (horario o antihorario) y cuántas vueltas completas se llevan acumuladas. Una flecha gráfica refleja la rotación en tiempo real.

## Materiales

- Smartphone (iPhone o Android con sensor de orientación)
- Computador con navegador Chrome o Safari
- Disco de cartón de ~15 cm de diámetro (o plato de papel / tapa grande de frasco)
- Base B — Cuna con elásticos (para fijar el teléfono al centro del disco)
- Eje central (hecho en LEGO Technic, pero puede utilizarse cualquier elemento que rote)

## Cómo usar

1. Abre la demo en vivo en el computador.
2. Click en "+ Conectar teléfono". Aparece un código QR.
3. Escanea el QR con el iPhone/Android.
4. **Permiso de orientación (iOS)**: aparecerá un botón rojo "PEDIR PERMISO DE ORIENTACIÓN". Tócalo y permite el acceso cuando iOS lo solicite. Sin este permiso el sensor no entrega datos.
5. Fija el teléfono al centro del disco con la Base B, sobre el eje rotatorio.
6. Pon el conjunto plano sobre la mesa, en la posición inicial deseada.
7. Toca **"Calibrar como posición 0"** en el teléfono.
8. Gira el disco sujetándolo por los bordes. En el PC:
   - La flecha roja gira en tiempo real.
   - El ángulo numérico crece o decrece según el sentido.
   - Aparece "↻ Horario" o "↺ Antihorario" con el número de vueltas completas.

## Sensor Protobject utilizado

El artefacto lee el sensor de orientación del teléfono a través de la API estándar `deviceorientation` del navegador, específicamente el valor `alpha` (rotación sobre el eje vertical, equivalente a una brújula).

Sobre esa lectura cruda el código construye un **ángulo continuo acumulado** que no se reinicia al cruzar 360°: si das dos vueltas en sentido horario, el valor llega a 720°; si giras en antihorario, llega a valores negativos. Esto permite rotación libre en ambos sentidos sin saltos visuales.

> **Nota sobre Protobject.Orientation**: el framework expone un componente `Orientation` con un valor `horizontalContinuous` ideal para este uso. En la práctica, en iOS 13+ la concesión de permiso de movimiento debe ocurrir desde un toque del usuario, y la inicialización de `Protobject.Orientation` antes del permiso no se recuperaba después. Por eso este artefacto utiliza directamente la API del navegador, que sí responde tras la concesión del permiso. El envío al PC sigue usando `Protobject.Core.send`.

`event.alpha` del DOM → acumulación de deltas para construir ángulo continuo → inversión de signo (para que horario físico = horario en pantalla) → diferencia con el origen calibrado → objeto `{ angulo, vueltas }` enviado al PC → flecha rotando + número + sentido. El PC nunca ve la lectura cruda del sensor, solo el evento semántico ya procesado.

## Cómo adaptarlo a otros usos

El patrón "objeto que se gira sobre un eje, con ángulo continuo acumulado" sirve para cualquier control rotativo:

- **Control de volumen o brillo**: en vez de mostrar el ángulo en grados, mapea `angulo` a un rango 0–100 (con `angulo % 360` o limitando el rango) y úsalo para mover una barra o cambiar el volumen de un audio.
- **Selector de categorías ordinales**: divide 360° en N sectores (meses, décadas, estaciones del año) y muestra la categoría correspondiente a `Math.floor((angulo % 360) / (360 / N))`, similar a cómo 01-slider discretiza una posición.
- **Rotar un modelo 3D o un mapa**: usa `angulo` directamente como el ángulo de rotación de un objeto en Three.js, Leaflet, etc., en vez de rotar una flecha CSS.
- **Dial de años o escala de tiempo**: mapea `angulo` (o las `vueltas` completas) a una fecha, para "viajar en el tiempo" girando físicamente el disco.

Lo que cambia en cada caso es solo qué representa `angulo`/`vueltas` en `index.html`; la lectura y acumulación del sensor en `sensor.html` se mantiene igual.

## Parámetros ajustables

Todos están al inicio del `<script>` de `sensor.html`:

- **`SENTIDO`** (default `-1`): controla si girar el teléfono en sentido horario mueve la flecha del PC en horario o antihorario. Cambia a `1` si el sentido queda invertido en tu montaje.
- **`UMBRAL_GRADOS`** (default `1`): cambio mínimo en grados para que se envíe un nuevo valor al PC. Súbelo si quieres menos tráfico de red / menos actualizaciones; bájalo para máxima sensibilidad.

## Notas técnicas

- Requiere calibración de un solo toque cada vez que se monta o se reorienta el sistema.
- En iPhone es obligatorio tocar el botón "PEDIR PERMISO DE ORIENTACIÓN" antes de calibrar; sin permiso el sensor no entrega lecturas.
- El sensor de orientación es **menos preciso cerca de objetos metálicos grandes** (laptops, parlantes, monitores). Si los grados se mueven solos sin que toques el teléfono, aleja el conjunto de fuentes magnéticas.
- Variante vertical (montaje en pared): requiere una solución mecánica adicional para que el teléfono no caiga por gravedad (doble círculo concéntrico de cartón, eje largo de LEGO Technic, etc).
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.
