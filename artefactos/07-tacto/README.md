# Superficie táctil con doble vista (HandSensor)

Dos teléfonos observan la misma escena desde ángulos distintos para confirmar toques reales del usuario sin necesidad de marcadores visibles. Un teléfono cenital lee la posición plana (X, Y) del dedo, otro teléfono frontal lee la altura (Z) sobre la mesa. El usuario primero **entrena** el sistema tocando en vivo tantos puntos como quiera sobre el tablero físico; luego, en modo uso, la pantalla del computador muestra en grande el número del punto que se está tocando.

## Materiales

- Dos smartphones (uno puede ser iPhone, el otro Android)
- Computador con navegador Chrome o Safari
- Base A2 (soporte cenital con 4 botellas) — para el teléfono CENITAL
- Base A1 (soporte vertical) — para el teléfono FRONTAL
- Un tablero de cartón (los puntos se definen libremente, no requiere marcado previo)

## Cómo usar

1. Monta la Base A2 con un teléfono mirando hacia abajo, al tablero.
2. Monta la Base A1 con el otro teléfono al costado, mirando al espacio bajo el cenital.
3. Abre la demo en vivo en el computador.
4. Click en "+ Conectar teléfonos". Escanea el QR con ambos teléfonos uno por uno, asegurándote que uno cargue `sensor-cenital.html` y el otro `sensor-frontal.html`.
5. Cuando ambas conexiones aparezcan en verde en el PC, empieza el **entrenamiento**:
   - Pon el dedo sobre un punto físico del tablero y haz click en **"➕ Añadir punto"**. El punto recibe un número automático (1, 2, 3, ...).
   - Repite para cada punto que quieras reconocer (no hay máximo).
   - Usa **"🗑 Borrar último"** para deshacer el último punto, o **"↺ Reiniciar"** para borrar todos.
6. Calibra las dos alturas del teléfono frontal (con el dedo sobre cualquier punto): **"📏 Dedo arriba (sin tocar)"** y **"📏 Dedo en la mesa"**.
7. Cuando haya al menos 1 punto y las dos alturas calibradas, toca **"▶ Iniciar modo tocar"**.
8. En modo uso: al tocar físicamente uno de tus puntos (dedo en su posición X,Y **y** a la altura de la mesa), aparece en pantalla el número grande de ese punto. Si solo pasas el dedo por encima sin tocar la mesa (hover), no aparece número.
9. Usa **"↺ Volver a entrenar"** para regresar a la fase de entrenamiento y ajustar los puntos o recalibrar sin perder lo ya definido.

## Sensor Protobject utilizado

`Protobject.HandSensor` — usa MediaPipe para detectar landmarks de la mano. El landmark 8 es la punta del dedo índice. Cada teléfono lo procesa independientemente: el cenital envía `{ tipo: "cenital", x, y }` y el frontal envía `{ tipo: "frontal", z }`.

La fusión ocurre en `index.html`: la posición X,Y se compara (distancia euclidiana) contra cada punto entrenado para saber sobre cuál está el dedo; la altura Z se compara contra el punto medio entre las dos alturas calibradas para saber si está tocando la mesa. Solo cuando ambas condiciones se cumplen a la vez se considera un toque confirmado y se muestra el número correspondiente — un evento semántico, nunca las coordenadas crudas.

## Cómo adaptarlo a otros usos

El patrón "posición 2D + confirmación de contacto mediante una segunda cámara" sirve para cualquier superficie táctil personalizada sin marcadores visibles:

- **Mapa interactivo**: en vez de números, entrena un punto por cada ciudad o región de un mapa impreso; al tocarla se muestra su información en el PC.
- **Teclado o control personalizado**: entrena un punto por cada "tecla" dibujada sobre cartón (letras, números, símbolos) para crear una interfaz física a medida.
- **Panel de control temático**: entrena puntos sobre íconos o zonas de una maqueta (por ejemplo, los ambientes de una casa en una maqueta de arquitectura) para disparar distintas visualizaciones según cuál se toque.

Para adaptarlo solo hay que cambiar qué se muestra o dispara al recibir cada número de punto en `index.html`; el entrenamiento, la detección de distancia y la confirmación de toque se mantienen igual sin importar qué representen los puntos.

## Parámetros ajustables

Ambos están en `index.html`:

- **`RADIO_PUNTO`** (default 0.12): distancia máxima (en las mismas unidades normalizadas 0–1 que x,y del cenital) para que el dedo cuente como "sobre" un punto entrenado. Súbelo si cuesta que se detecte el toque; bájalo si puntos cercanos se confunden entre sí.
- **`VENTANA_MS`** (default 250): milisegundos que se considera vigente la última lectura de cada teléfono. Si no llegan datos frescos de ambos dentro de este tiempo, se asume que no hay dedo presente.

## Notas técnicas

- Es el artefacto más complejo del catálogo. Requiere dos teléfonos sincronizados y una calibración cuidadosa de puntos y alturas.
- La gran ventaja sobre otros artefactos táctiles: **superficie limpia, sin marcadores ArUco visibles** en la escena.
- Si el sistema confunde toques (marca un punto sin que lo toques), sube `RADIO_PUNTO` o revisa la calibración de alturas del frontal. Si no confirma toques claros, baja `RADIO_PUNTO` o recalibra con una diferencia más marcada entre "dedo arriba" y "dedo en la mesa".
- Probado con dos iPhones (Safari) y con la combinación Android (Chrome) + iPhone.
- El teléfono y el computador deben estar en la misma red WiFi.
