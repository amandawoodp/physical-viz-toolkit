# Superficie táctil con doble vista (HandSensor)

Dos teléfonos observan la misma escena desde ángulos distintos para confirmar toques reales del usuario sin necesidad de marcadores visibles. Un teléfono cenital lee la posición plana (X, Y) del dedo, otro teléfono frontal lee la altura (Z) sobre la mesa. La pantalla del computador solo confirma un toque cuando ambas coordenadas coinciden en una zona activa.

## Materiales

- Dos smartphones (uno puede ser iPhone, el otro Android)
- Computador con navegador Chrome o Safari
- Base A2 (soporte cenital con 4 botellas) — para el teléfono CENITAL
- Base A1 (soporte vertical) — para el teléfono FRONTAL
- Cartón decorado con las tres zonas marcadas visualmente (opcional pero recomendado)

## Cómo usar

Ver instrucciones detalladas en el código fuente. Resumen:

1. Monta la Base A2 con un teléfono mirando hacia abajo a la mesa.
2. Monta la Base A1 con otro teléfono al costado, mirando al espacio bajo el cenital.
3. Abre la demo en el computador. Escanea el QR con ambos teléfonos uno por uno, asegurándote que uno cargue `sensor-cenital.html` y el otro `sensor-frontal.html`.
4. Cuando ambas conexiones aparezcan en verde en el PC, mueve el dedo bajo las cámaras.
5. **Hover** (zona amarilla): el dedo está en X, Y de la zona pero no a la altura de la mesa.
6. **Toque** (zona verde): el dedo está en la zona Y cerca de la mesa simultáneamente.

## Componente Protobject

`Protobject.HandSensor` — usa MediaPipe para detectar landmarks de la mano. El landmark 8 es la punta del dedo índice. Cada teléfono lo procesa independientemente y envía al PC su componente de información.

## Notas

- Es el artefacto más complejo del catálogo. Requiere dos teléfonos sincronizados y calibración cuidadosa de las zonas.
- Las coordenadas de las zonas en `index.html` se definen en proporciones del frame de la cámara cenital. Ajusta según el campo de visión de tu setup.
- La gran ventaja sobre otros artefactos táctiles: **superficie limpia, sin marcadores ArUco visibles** en la escena.
- Si el sistema confunde toques (marca zona sin que toques), sube el `UMBRAL_ALTURA` en `index.html`. Si no confirma toques claros, bájalo.
- Probado con dos iPhones (Safari) y un Android (Chrome) + un iPhone.