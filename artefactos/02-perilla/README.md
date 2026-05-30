# Perilla giratoria

El usuario gira el teléfono sobre la mesa como si fuera una perilla. La pantalla del computador muestra el ángulo girado desde la posición inicial, el sentido de la rotación (horario o antihorario) y cuántas vueltas completas se llevan acumuladas. Una flecha gráfica refleja la rotación en tiempo real.

## Materiales

- Smartphone (iPhone o Android con sensor de orientación)
- Computador con navegador Chrome o Safari
- Disco de cartón de ~15 cm de diámetro (o plato de papel / tapa grande de frasco)
- Base B — Cuna con elásticos (para fijar el teléfono al centro del disco)
- Mondadientes (eje central improvisado)

## Cómo usar

1. Abre [la demo en vivo](https://amandawoodp.github.io/physical-viz-toolkit/artefactos/02-perilla/) en el computador.
2. Click en "+ Conectar teléfono". Aparece un código QR.
3. Escanea el QR con el iPhone/Android.
4. **Permiso de orientación**: en algunos iPhones aparece un cuadro adicional pidiendo acceso a "Movimiento y orientación". Concédelo. Si no aparece y los valores no se mueven, ve a Ajustes → Safari → Movimiento y orientación → permitir.
5. Fija el teléfono al centro del disco con la Base B, dejando un mondadientes clavado como eje central debajo (sin tocar el teléfono).
6. Pon el conjunto plano sobre la mesa, en la posición inicial deseada.
7. Toca **"Calibrar como posición 0"** en el teléfono.
8. Gira el disco sujetándolo por los bordes. En el PC:
   - La flecha roja gira en tiempo real.
   - El ángulo numérico crece o decrece según el sentido.
   - Aparece "↻ Horario" o "↺ Antihorario" con el número de vueltas completas.

## Componente Protobject

`Protobject.Orientation` — accede al magnetómetro y giroscopio del teléfono. Usamos específicamente el valor `horizontalContinuous`, que **no se reinicia al cruzar 360°**: si das dos vueltas en sentido horario, el valor llega a 720; si giras en antihorario, llega a valores negativos. Esto permite rotación libre en ambos sentidos sin saltos visuales.

## Sensor y mapeo de datos

`Orientation.horizontalContinuous` (ángulo absoluto sin saltos) → diferencia con el origen calibrado → ángulo relativo + número de vueltas → objeto `{ angulo, vueltas }` enviado al PC → flecha rotando + número + sentido.

El código aplica un **filtro de ruido**: solo envía cambios superiores a 1° desde el último envío, para evitar saturar con micro-vibraciones del sensor.

## Usos típicos

- Ajuste continuo de un valor numérico (volumen, escala de tiempo, año)
- Rotar un modelo 3D o un mapa
- Desplazarse por categorías ordinales (meses, décadas)
- Doble cubo en un slider → reemplazado por perilla cuando se quiere rango continuo en vez de discreto

## Notas

- Requiere calibración de un solo toque cada vez que se monta o se reorienta el sistema.
- El sensor de orientación es **menos preciso cerca de objetos metálicos grandes** (laptops, parlantes, monitores). Si los grados se mueven solos sin que toques el teléfono, aleja el conjunto de fuentes magnéticas.
- Variante vertical (montaje en pared): requiere una solución mecánica adicional para que el teléfono no caiga por gravedad (doble círculo concéntrico de cartón, eje largo de LEGO Technic, etc).
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.