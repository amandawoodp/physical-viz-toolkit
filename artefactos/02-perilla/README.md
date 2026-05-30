# Perilla giratoria

El usuario gira el teléfono sobre la mesa como si fuera una perilla. La pantalla del computador muestra el ángulo girado desde la posición inicial, el sentido de la rotación (horario o antihorario) y cuántas vueltas completas se llevan acumuladas. Una flecha gráfica refleja la rotación en tiempo real.

## Materiales

- Smartphone (iPhone o Android con sensor de orientación)
- Computador con navegador Chrome o Safari
- Disco de cartón de ~15 cm de diámetro (o plato de papel / tapa grande de frasco)
- Base B — Cuna con elásticos (para fijar el teléfono al centro del disco)
- Eje central (hecho en LEGO Technic, pero puede utilizarse cualquier elemento que rote)

## Cómo usar

1. Abre [la demo en vivo](https://amandawoodp.github.io/physical-viz-toolkit/artefactos/02-perilla/) en el computador.
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

## Sensor utilizado

El artefacto lee el sensor de orientación del teléfono a través de la API estándar `deviceorientation` del navegador, específicamente el valor `alpha` (rotación sobre el eje vertical, equivalente a una brújula).

Sobre esa lectura cruda el código construye un **ángulo continuo acumulado** que no se reinicia al cruzar 360°: si das dos vueltas en sentido horario, el valor llega a 720°; si giras en antihorario, llega a valores negativos. Esto permite rotación libre en ambos sentidos sin saltos visuales.

> **Nota sobre Protobject.Orientation**: el framework expone un componente `Orientation` con un valor `horizontalContinuous` ideal para este uso. En la práctica, en iOS 13+ la concesión de permiso de movimiento debe ocurrir desde un toque del usuario, y la inicialización de `Protobject.Orientation` antes del permiso no se recuperaba después. Por eso este artefacto utiliza directamente la API del navegador, que sí responde tras la concesión del permiso. El envío al PC sigue usando `Protobject.Core.send`.

## Sensor y mapeo de datos

`event.alpha` del DOM → acumulación de deltas para construir ángulo continuo → inversión de signo (para que horario físico = horario en pantalla) → diferencia con el origen calibrado → objeto `{ angulo, vueltas }` enviado al PC → flecha rotando + número + sentido.

El estudiante final nunca ve la lectura cruda del sensor: solo recibe un evento semántico con el ángulo ya procesado y las vueltas completas acumuladas.

## Usos típicos

- Ajuste continuo de un valor numérico (volumen, escala de tiempo, año)
- Rotar un modelo 3D o un mapa
- Desplazarse por categorías ordinales (meses, décadas)
- Doble cubo en un slider → reemplazado por perilla cuando se quiere rango continuo en vez de discreto

## Notas

- Requiere calibración de un solo toque cada vez que se monta o se reorienta el sistema.
- En iPhone es obligatorio tocar el botón "PEDIR PERMISO DE ORIENTACIÓN" antes de calibrar; sin permiso el sensor no entrega lecturas.
- El sensor de orientación es **menos preciso cerca de objetos metálicos grandes** (laptops, parlantes, monitores). Si los grados se mueven solos sin que toques el teléfono, aleja el conjunto de fuentes magnéticas.
- Variante vertical (montaje en pared): requiere una solución mecánica adicional para que el teléfono no caiga por gravedad (doble círculo concéntrico de cartón, eje largo de LEGO Technic, etc).
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.