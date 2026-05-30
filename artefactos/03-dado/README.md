# Dado de decisión

El usuario lanza un Cubo ArUco bajo la cámara cenital. El teléfono identifica qué cara queda hacia arriba y la pantalla del computador muestra el número de esa cara, cada uno con un color distinto.

## Materiales

- Smartphone (iPhone o Android con cámara)
- Computador con navegador Chrome o Safari
- Cubo ArUco (ver guía de Piezas Base)
- Base A2 — Soporte cenital con 4 botellas

## Cómo usar

1. Abre [la demo en vivo](https://amandawoodp.github.io/physical-viz-toolkit/artefactos/03-dado/) en el computador.
2. Click en "+ Conectar teléfono". Aparece un código QR.
3. Escanea el QR con el iPhone/Android. Acepta el permiso de cámara.
4. Coloca el teléfono en la Base A2 (soporte cenital con 4 botellas), con la cámara apuntando perpendicularmente hacia abajo.
5. Lanza o apoya el Cubo ArUco bajo la cámara, con cualquier cara hacia arriba.
6. La pantalla del computador muestra un número del 1 al 6, con un color asociado a esa cara.
7. Cambia la cara visible: el número y el color cambian con un pequeño "pop" visual.

## Componente Protobject

`Protobject.Aruco` — detecta marcadores ArUco con la cámara trasera del teléfono. El código toma siempre el marcador más grande visible (la cara superior del cubo) y mapea su ID a un número de cara del 1 al 6.

## Sensor y mapeo de datos

ID del marcador ArUco detectado → número de cara del dado (1–6) → número grande y color en pantalla del PC.

El código aplica una **histéresis temporal de 400 ms**: solo confirma una cara cuando se mantiene estable durante ese tiempo. Esto evita que durante un lanzamiento (cuando el cubo rueda y la cámara ve brevemente varias caras) el PC parpadee entre números. Lo que se envía al PC es un evento semántico ("la cara X quedó arriba"), no el flujo crudo de detecciones.

## Usos típicos

- Selector discreto de categorías (6 opciones)
- Modo "aleatorio" para explorar datos
- Decisión interactiva en un museo: "¿qué historia quieres ver?"

## Notas

- No requiere calibración.
- Si el cubo usa IDs distintos a 0–5, ajusta el mapeo en el objeto `carasPorId` dentro de `sensor.html`. Para descubrir los IDs reales, pon cada cara hacia arriba y mira lo que dice el teléfono.
- Iluminación difusa, evitar reflejos sobre el cubo.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.