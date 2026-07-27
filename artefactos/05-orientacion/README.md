# Sensor de orientación

El usuario abre y cierra un libro que tiene el teléfono fijado sobre su tapa. La pantalla del computador muestra "ON" cuando el libro está abierto y "OFF" cuando está cerrado, además de cambiar todo el fondo de color para reforzar el estado actual.

## Materiales

- Smartphone (iPhone o Android con sensor de orientación)
- Computador con navegador Chrome o Safari
- Un libro (preferentemente de tapa dura)
- Base B — Cuna con elásticos
- Masking tape para fijar la Base B a la tapa del libro

## Cómo usar

1. Fija el teléfono dentro de la Base B y pega la Base B sobre la tapa del libro con masking tape.
2. Abre la demo en vivo en el computador.
3. Click en "+ Conectar teléfono". Aparece un código QR.
4. Escanea el QR con el iPhone/Android.
5. **Permiso de orientación (iOS)**: aparecerá un botón rojo. Tócalo y permite el acceso cuando iOS lo solicite.
6. **Calibración en dos pasos**:
   - Cierra el libro y toca **"📕 CALIBRAR LIBRO CERRADO (OFF)"**.
   - Abre el libro completamente y toca **"📖 CALIBRAR LIBRO ABIERTO (ON)"**.
7. ¡Listo! Abre y cierra el libro. La pantalla del PC alterna entre **ON** (fondo verde) y **OFF** (fondo rojo).

## Sensor Protobject utilizado

El artefacto lee el sensor de orientación del teléfono a través de la API estándar `deviceorientation` del navegador, específicamente el valor `beta` (inclinación adelante-atrás). A diferencia de la perilla (artefacto 02), aquí no se necesita un ángulo continuo: solo interesa saber **en qué lado de un umbral** está la lectura actual.

`event.beta` del DOM → normalización entre los dos puntos calibrados (OFF=0, ON=1) → comparación contra `UMBRAL` → string "ON" u "OFF" → fondo de color + texto gigante en pantalla del PC. El estudiante final solo recibe un evento semántico ("ON"/"OFF"), nunca el ángulo crudo, y solo se envía un mensaje cuando el estado realmente cambia.

## Cómo adaptarlo a otros usos

El patrón "Base B sobre un objeto que cambia de orientación entre dos posiciones conocidas" sirve para cualquier interruptor de dos estados basado en inclinación:

- **Puerta o mueble**: pega la Base B en la cara interior de la puerta de un mueble o gabinete. Al abrirla se activa una visualización; al cerrarla, se apaga.
- **Tapa de notebook o estuche**: úsalo como sensor de "abierto = en uso, cerrado = guardado" para disparar un estado en una experiencia narrativa.
- **Palanca o brazo articulado de un juguete**: cualquier objeto cuyo ángulo cambie naturalmente entre dos posiciones de uso (una palanca arriba/abajo, un cajón abierto/cerrado si se monta el sensor en la gaveta).

Para adaptarlo solo hay que recalibrar los dos estados (el código no distingue "libro" de cualquier otro objeto) y, si corresponde, cambiar los textos "ON"/"OFF" por nombres más descriptivos del nuevo contexto.

## Parámetros ajustables

Ambos están en `sensor.html`:

- **`UMBRAL`** (default `0.5`): punto de corte (0–1) entre los estados OFF y ON, como fracción de la distancia entre los dos valores calibrados. `0.5` = punto medio exacto; súbelo (ej. `0.7`) para que cueste más pasar a ON, o bájalo para que cueste más volver a OFF.
- **`event.beta` vs `event.gamma`** (en `handler`): eje de inclinación que se lee. Cambia `beta` por `gamma` si en tu montaje el cambio principal al abrir/cerrar ocurre en el eje izquierda-derecha en vez de adelante-atrás.

## Notas técnicas

- Requiere calibración de dos toques cada vez que se monta o reorienta el sistema.
- En iPhone es obligatorio tocar el botón "PEDIR PERMISO DE ORIENTACIÓN" antes de calibrar.
- El sensor es menos preciso cerca de objetos metálicos grandes (laptops, parlantes). Aleja el conjunto si los valores se mueven solos.
- Si el cambio principal de inclinación al abrir el libro viene del eje `gamma` en lugar de `beta` (depende de cómo orientes el teléfono sobre el libro), cambia `event.beta` por `event.gamma` en el `handler` del `sensor.html`.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.
