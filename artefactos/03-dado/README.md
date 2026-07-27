# Dado de decisión

El usuario lanza un Cubo ArUco bajo la cámara cenital. El teléfono identifica qué cara queda hacia arriba y la pantalla del computador muestra el número de esa cara, cada uno con un color distinto.

## Materiales

- Smartphone (iPhone o Android con cámara)
- Computador con navegador Chrome o Safari
- Cubo ArUco (ver guía de Piezas Base)
- Base A2 — Soporte cenital con 4 botellas

## Cómo usar

1. Abre la demo en vivo en el computador.
2. Click en "+ Conectar teléfono". Aparece un código QR.
3. Escanea el QR con el iPhone/Android. Acepta el permiso de cámara.
4. Coloca el teléfono en la Base A2 (soporte cenital con 4 botellas), con la cámara apuntando perpendicularmente hacia abajo.
5. Lanza o apoya el Cubo ArUco bajo la cámara, con cualquier cara hacia arriba.
6. La pantalla del computador muestra un número del 1 al 6, con un color asociado a esa cara.
7. Cambia la cara visible: el número y el color cambian con un pequeño "pop" visual.

## Sensor Protobject utilizado

`Protobject.Aruco` — detecta marcadores ArUco con la cámara trasera del teléfono y entrega un objeto con todos los marcadores visibles (`{ id: { position, size }, ... }`). El código toma siempre el marcador de mayor tamaño (la cara superior del cubo, más cercana a la cámara) y mapea su ID a un número de cara del 1 al 6 mediante el objeto `carasPorId`.

ID del marcador detectado → número de cara del dado (1–6) → número grande y color en pantalla del PC. El código aplica una **histéresis temporal** (`ESTABLE_MS`): solo confirma una cara cuando se mantiene estable durante ese tiempo, para que un lanzamiento (donde el cubo rueda y la cámara ve brevemente varias caras) no haga parpadear el número en el PC. Lo que se envía es un evento semántico ("la cara X quedó arriba"), nunca el flujo crudo de detecciones.

## Cómo adaptarlo a otros usos

El patrón "objeto con caras identificables, se confirma la que queda visible/arriba" sirve para cualquier selector discreto de pocas categorías:

- **Selector de escenario o modo de vista**: en vez de números 1–6, asocia cada cara a una vista distinta de una visualización (gráfico de barras, mapa, línea de tiempo).
- **Decisión interactiva en un museo o feria**: "¿qué historia quieres ver?" — cada cara dispara un video, audio o animación distinta.
- **Selector aleatorio para explorar datos**: usa el número de cara para saltar a un registro aleatorio de un dataset, útil para "muéstrame un ejemplo cualquiera".
- **Dado con más o menos caras**: si usas una figura con otra cantidad de caras (tetraedro, icosaedro), solo hay que ajustar `carasPorId` con los IDs reales y el rango de colores en `coloresPorCara`.

Lo que cambia en cada caso es solo qué representa cada número en `index.html`; la detección, el mapeo ID→cara y la histéresis en `sensor.html` se mantienen igual.

## Parámetros ajustables

- **`ESTABLE_MS`** (`sensor.html`, default 400): milisegundos que una cara debe mantenerse como la más grande/visible antes de confirmarla y enviarla al PC. Súbelo si el número sigue parpadeando durante el lanzamiento; bájalo para una respuesta más inmediata.
- **`carasPorId`** (`sensor.html`): mapeo de ID de marcador ArUco → número de cara (1–6). Ajústalo si tu cubo usa otros IDs (mira la consola del teléfono con cada cara hacia arriba para descubrirlos).
- **`coloresPorCara`** (`index.html`): color asociado a cada número de cara. Puramente estético, cámbialo libremente.

## Notas técnicas

- No requiere calibración.
- Si el cubo usa IDs distintos a 0–5, ajusta el mapeo en el objeto `carasPorId` dentro de `sensor.html`. Para descubrir los IDs reales, pon cada cara hacia arriba y mira lo que dice el teléfono.
- Iluminación difusa, evitar reflejos sobre el cubo.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.
