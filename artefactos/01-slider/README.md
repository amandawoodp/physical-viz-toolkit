# Slider óptico

El usuario desliza un Cubo ArUco a lo largo de un canal de cartón. El teléfono detecta la posición del cubo y la pantalla del computador muestra un número entero del 0 al 4.

## Materiales

- Smartphone (iPhone o Android con cámara)
- Computador con navegador Chrome o Safari
- Cubo ArUco (ver guía de Piezas Base)
- Base A2 — Soporte cenital con 4 botellas
- 2 tiras de cartón rígido (~25 cm × 3 cm)
- Masking tape

## Cómo usar

1. Abre [la demo en vivo](https://amandawoodp.github.io/physical-viz-toolkit/artefactos/01-slider/) en el computador.
2. Click en "+ Conectar teléfono". Aparece un código QR.
3. Escanea el QR con el iPhone/Android. Acepta el permiso de cámara.
4. Coloca el teléfono en la Base A2 (soporte cenital con 4 botellas), con la cámara apuntando perpendicularmente hacia abajo al canal de cartón.
5. **Calibra:** cubo al extremo izquierdo del canal → toca la pantalla del teléfono. Luego cubo al extremo derecho → toca otra vez.
6. Desliza el cubo. El computador muestra 0, 1, 2, 3 o 4 según en qué quinta parte del canal se encuentre el cubo.

## Componente Protobject

`Protobject.Aruco` — detecta marcadores ArUco con la cámara trasera del teléfono. Se toma siempre el marcador más grande visible (la cara más cercana a la cámara), por lo que el slider funciona con cualquiera de las 6 caras del cubo.

## Sensor y mapeo de datos

Posición del marcador ArUco en la cámara → normalización entre extremos calibrados → 5 casillas discretas (0–4) → número entero en la pantalla del PC.

El código envía un mensaje al PC **solo cuando cambia la casilla**: ese es el evento semántico. Nunca se transmite el flujo crudo de la posición.

## Usos típicos

- Scrubber de línea de tiempo
- Selector de intervalos en un histograma
- Filtro de rango numérico (versión con dos cubos en el mismo canal)
- Selector ordinal entre 5 opciones

## Notas

- Requiere calibración in situ cada vez que se monta el sistema.
- Iluminación difusa, evitar reflejos sobre el cubo.
- Probado en iPhone con Safari. En Android usar Chrome.
- El teléfono y el computador deben estar en la misma red WiFi.