# Slider óptico

El usuario desliza un Cubo ArUco a lo largo de un canal de cartón. El teléfono, montado en posición cenital sobre el canal, detecta la posición del cubo con la cámara y la pantalla del computador muestra un número entero del 0 al 2 según en qué tercio del canal se encuentra.

La interacción es la de un slider físico: mover un objeto a lo largo de un eje para elegir un valor discreto.

## Materiales

- Smartphone (iPhone o Android con cámara)
- Computador con navegador Chrome o Safari
- Cubo ArUco (ver guía de Piezas Base)
- Base A2 — Soporte cenital con 4 botellas
- 2 tiras de cartón rígido (~25 cm × 3 cm), formando un canal
- Masking tape

## Cómo usar

1. Abre la demo en vivo en el computador.
2. Click en "+ Conectar teléfono". Aparece un código QR.
3. Escanea el QR con el teléfono. Acepta el permiso de cámara.
4. Coloca el teléfono en la Base A2 (soporte cenital con 4 botellas), con la cámara apuntando perpendicularmente hacia abajo al canal de cartón.
5. **Calibra:** pon el cubo en el extremo 0 del canal → toca **Calibrar extremo 0**. Luego pon el cubo en el extremo 2 → toca **Calibrar extremo 2**.
6. Desliza el cubo por el canal. El computador muestra 0, 1 o 2 según la posición del cubo.

## Sensor Protobject utilizado

`Protobject.Aruco` — detecta marcadores ArUco con la cámara trasera del teléfono y entrega, por cada marcador visible, su posición (`position.x`, `position.y`) y tamaño en la imagen. El código promedia estos datos (ponderados por tamaño) para estimar la ubicación del cubo, y usa `Protobject.Aruco.start(resolución, índiceCámara)` y `Protobject.Aruco.showPreview(...)` para iniciar la detección y mostrar la vista previa de la cámara en pantalla.

## Cómo adaptarlo a otros usos

El patrón "objeto físico que se desliza por un eje, visto cenitalmente" sirve para cualquier selector lineal discreto o continuo:

- **Scrubber de línea de tiempo**: en vez de mostrar 0/1/2, mapea `t` (el valor normalizado 0–1 antes de discretizar) a una fecha o frame de un video/animación.
- **Filtro de rango numérico**: usa dos cubos ArUco distintos en el mismo canal (uno por extremo del rango) y envía ambos valores al PC.
- **Selector ordinal de más de 3 opciones**: cambia `Math.floor(t * 3)` por `Math.floor(t * N)` y ajusta el HTML para mostrar N círculos en vez de 3.
- **Ecualizador o control de volumen**: usa `t` directamente (sin discretizar) para mover una barra o cambiar el volumen de un audio en tiempo real.

Lo que cambia en cada caso es solo qué representa el número final (`actualizarSlider` y `pintar`); la detección y calibración del cubo se mantienen igual.

## Parámetros ajustables

Todos están al inicio del `<script>` de `sensor.html`:

- **`LECTURAS_MEDIANA`** (default 5): cuántas lecturas recientes se promedian (mediana) para estabilizar la posición del cubo. Súbelo si el valor "tiembla"; bájalo si sientes el sensor lento para reaccionar.
- **`LECTURAS_ESTABLES_PARA_CAMBIAR`** (default 2): cuántas lecturas seguidas deben coincidir en un mismo tercio antes de aceptarlo como nuevo valor. Súbelo para evitar cambios accidentales por ruido.
- **`INTERVALO_SALIDA_MS`** (default 160): milisegundos entre cada paso de la animación gradual (0→1→2). Súbelo para una transición más lenta y visible; bájalo para que el valor llegue más rápido a destino.
- **`umbralMinimo`** (calculado automáticamente según la escala de coordenadas que entregue el dispositivo): distancia mínima aceptable entre los dos extremos calibrados. No suele necesitar ajuste manual.

## Notas técnicas

- Requiere calibración in situ cada vez que se monta el sistema.
- La cámara debe ver claramente al menos una cara ArUco del cubo.
- Si el cubo no se detecta bien, mejora la iluminación, evita reflejos, o usa el botón "Intentar activar flash" (depende del navegador/dispositivo).
- El canal debe tener suficiente largo para que los extremos 0 y 2 queden separados en cámara. Esta versión usa solo 3 posiciones para funcionar mejor cuando el cubo ocupa pocos píxeles o la cámara está más alta.
- Probado en iPhone con Safari. En Android usar Chrome.
- El teléfono y el computador deben estar en la misma red WiFi.
