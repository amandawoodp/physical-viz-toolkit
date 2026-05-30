# Slider óptico

El usuario desliza un Cubo ArUco a lo largo de un canal de cartón. El teléfono detecta la posición del cubo y la pantalla del computador muestra un número entero del 0 al 2.

## Materiales

- Smartphone (iPhone o Android con cámara)
- Computador con navegador Chrome o Safari
- Cubo ArUco (ver guía de Piezas Base)
- Base A2 — Soporte cenital con 4 botellas
- 2 tiras de cartón rígido (~25 cm × 3 cm)
- Masking tape

## Cómo usar

1. Abre la demo en vivo en el computador.
2. Click en "+ Conectar teléfono". Aparece un código QR.
3. Escanea el QR con el iPhone/Android. Acepta el permiso de cámara.
4. Coloca el teléfono en la Base A2 (soporte cenital con 4 botellas), con la cámara apuntando perpendicularmente hacia abajo al canal de cartón.
5. **Calibra:** cubo al extremo 0 del canal → toca **Calibrar extremo 0**. Luego cubo al extremo 2 → toca **Calibrar extremo 2**.
6. Desliza el cubo. El computador muestra 0, 1 o 2 según en qué parte del canal se encuentre el cubo.

## Componente Protobject

`Protobject.Aruco` — detecta marcadores ArUco con la cámara trasera del teléfono. El código usa la posición de los marcadores visibles para estimar la ubicación del cubo.

## Sensor y mapeo de datos

Posición del marcador ArUco en la cámara → normalización entre extremos calibrados → 3 casillas discretas (0–2) → número entero en la pantalla del PC.

La versión corregida evita saltos bruscos. Primero detecta automáticamente si el canal está mejor alineado con el eje X o con el eje Y de la cámara. Luego aplica una mediana corta para estabilizar la lectura y entrega la salida de forma gradual: si el cubo pasa de 0 a 2, la pantalla muestra 0 → 1 → 2, sin saltarse valores intermedios.

El código envía al PC solo el evento semántico final: `0`, `1` o `2`. Nunca se transmite el flujo crudo de la posición.

## Usos típicos

- Scrubber de línea de tiempo
- Selector de intervalos en un histograma
- Filtro de rango numérico (versión con dos cubos en el mismo canal)
- Selector ordinal entre 3 opciones

## Notas

- Requiere calibración in situ cada vez que se monta el sistema.
- La cámara debe ver claramente al menos una cara ArUco del cubo.
- Si el cubo no se detecta bien, mejora la iluminación, evita reflejos y revisa que el teléfono esté realmente cenital.
- El canal debe tener suficiente largo para que los extremos 0 y 2 queden separados en cámara. Esta versión usa solo 3 posiciones para funcionar mejor cuando el cubo ocupa pocos píxeles o la cámara está más alta.
- Probado en iPhone con Safari. En Android usar Chrome.
- El teléfono y el computador deben estar en la misma red WiFi.
