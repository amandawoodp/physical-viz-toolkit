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
2. Abre [la demo en vivo](https://amandawoodp.github.io/physical-viz-toolkit/artefactos/05-orientacion/) en el computador.
3. Click en "+ Conectar teléfono". Aparece un código QR.
4. Escanea el QR con el iPhone/Android.
5. **Permiso de orientación (iOS)**: aparecerá un botón rojo. Tócalo y permite el acceso cuando iOS lo solicite.
6. **Calibración en dos pasos**:
   - Cierra el libro y toca **"📕 CALIBRAR LIBRO CERRADO (OFF)"**.
   - Abre el libro completamente y toca **"📖 CALIBRAR LIBRO ABIERTO (ON)"**.
7. ¡Listo! Abre y cierra el libro. La pantalla del PC alterna entre **ON** (fondo verde) y **OFF** (fondo rojo).

## Sensor utilizado

El artefacto lee el sensor de orientación del teléfono a través de la API estándar `deviceorientation` del navegador, específicamente el valor `beta` (inclinación adelante-atrás).

A diferencia de la perilla, aquí no necesitamos un ángulo continuo: solo nos interesa saber **en qué lado del umbral** estamos. La calibración define dos puntos (OFF y ON) y el código calcula si la lectura actual está más cerca de uno o del otro.

## Sensor y mapeo de datos

`event.beta` del DOM → normalización entre los dos puntos calibrados (OFF=0, ON=1) → comparación contra umbral 0.5 → string "ON" u "OFF" → fondo de color + texto gigante en pantalla del PC.

El estudiante final solo recibe un evento semántico ("ON" / "OFF"), nunca el ángulo crudo.

## Usos típicos

- **Libro como interruptor narrativo**: al abrirlo se activa una visualización, al cerrarlo se desactiva.
- **Puerta o mueble**: pega la Base B en la cara interior de la puerta de un mueble. Al abrirla aparece información.
- **Tapa de notebook**: úsalo como sensor de "el visitante está concentrado vs no" en una experiencia narrativa.
- **Brazo articulado o juguete con bisagra**: cualquier objeto cuyo ángulo cambie naturalmente durante su uso.

## Notas

- Requiere calibración de dos toques cada vez que se monta o reorienta el sistema.
- En iPhone es obligatorio tocar el botón "PEDIR PERMISO DE ORIENTACIÓN" antes de calibrar.
- El sensor es menos preciso cerca de objetos metálicos grandes (laptops, parlantes). Aleja el conjunto si los valores se mueven solos.
- Si el cambio principal de inclinación al abrir el libro viene del eje `gamma` en lugar de `beta` (depende de cómo orientes el teléfono sobre el libro), cambia `event.beta` por `event.gamma` en el `handler` del `sensor.html`.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.