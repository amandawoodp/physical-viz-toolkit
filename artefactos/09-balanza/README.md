# Balanza de datos

El usuario pone objetos en los dos platillos de una balanza física que tiene el teléfono fijado al eje central como fulcro. La pantalla del computador muestra una balanza animada que se inclina hacia el lado que pesa más, con un indicador del porcentaje de desbalance.

## Materiales

- Smartphone (iPhone o Android con sensor de orientación)
- Computador con navegador Chrome o Safari
- **Estructura LEGO Technic** que forme una balanza de dos platillos con un eje central horizontal. El teléfono va **atravesado por el eje Technic** (su lado largo paralelo al brazo de la balanza).
- **Base C** — Adaptador para conectar el teléfono a piezas LEGO Technic
- Dos platillos: cajas de cartón, vasitos o cualquier recipiente que pueda colgar de los extremos del brazo
- Objetos para pesar: monedas, lápices, gomas, etc.

## Por qué LEGO Technic

Este artefacto es el **ejemplo demostrativo obligatorio** de la Base C según la guía del toolkit. Aprovecha la precisión mecánica de los engranajes y ejes Technic para conseguir un fulcro fluido y reproducible que sería muy difícil de lograr con cartón solo.

## Cómo usar

1. Construye la balanza en LEGO Technic con el eje central horizontal donde encaja el teléfono.
2. Atraviesa el teléfono con el eje Technic usando la Base C, dejando que pivote libremente.
3. Cuelga los dos platillos de los extremos del brazo.
4. Abre [la demo en vivo](https://amandawoodp.github.io/physical-viz-toolkit/artefactos/09-balanza/) en el computador.
5. Click en "+ Conectar teléfono". Aparece un código QR.
6. Escanea el QR con el iPhone/Android.
7. **Permiso de orientación (iOS)**: aparecerá un botón rojo. Tócalo y permite el acceso.
8. **Calibración de tres pasos** (ver sección siguiente).
9. Pon objetos en un platillo. La balanza física se inclina y la pantalla del PC refleja el desbalance en tiempo real.

## Calibración de tres pasos

La balanza se autocalibra al rango físico real de tu montaje. Esto significa que aunque tu balanza solo se incline ±5° en total, la pantalla del PC siempre va a cubrir todo el rango -100% a +100%.

**Paso 1 — Equilibrio**: Pon la balanza con ambos platillos vacíos (o con pesos iguales). Toca el botón. Ese ángulo se guarda como "cero".

**Paso 2 — Máximo a la izquierda**: Pon objetos solo en el platillo izquierdo hasta que la balanza llegue a su máxima inclinación física de ese lado. Toca el botón. Ese ángulo se guarda como "-100%".

**Paso 3 — Máximo a la derecha**: Saca los objetos del izquierdo y ponlos en el derecho hasta la máxima inclinación. Toca el botón. Ese ángulo se guarda como "+100%".

A partir de ese momento, cualquier inclinación intermedia se mapea proporcionalmente al rango calibrado.

Si quieres recalibrar (porque cambiaste los platillos, moviste la balanza o quieres ajustarla a otra escena), toca "↺ Reiniciar calibración" y vuelve a hacer los tres pasos.

## Sensor utilizado

El artefacto lee el sensor de orientación del teléfono a través de la API estándar `deviceorientation`, específicamente el valor `gamma` (inclinación lateral izquierda-derecha).

Cuando la balanza se inclina hacia un lado, el teléfono que está incorporado al eje central también se inclina. La diferencia respecto al equilibrio calibrado se convierte en un porcentaje de desbalance de -100% a +100%.

## Sensor y mapeo de datos

`event.gamma` del DOM → diferencia respecto al equilibrio calibrado → normalización proporcional al rango izquierda/derecha calibrado → aplicación de zona muerta (anti-temblor) → suavizado exponencial → enviado al PC solo cuando cambia más de 2%.

El estudiante final recibe un evento semántico: un número con signo que indica qué lado pesa más y por cuánto.

## Parámetros de sensibilidad

Tres constantes en `sensor.html` controlan el comportamiento del sensor. Si necesitas afinar el artefacto en tu setup físico, estos son los valores que ajustar:

- **`ZONA_MUERTA = 15`**: Si la inclinación es menor al 15% del rango calibrado, se considera equilibrio (cero). Esto resuelve el problema de "nunca alcanza el cero" por temblor del fulcro o pequeños desequilibrios físicos. Súbelo (a 20 o 25) si tu balanza nunca llega al equilibrio incluso vacía. Bájalo si necesitas más sensibilidad cerca del cero.

- **`SUAVIZADO = 0.7`**: Filtra las micro-vibraciones del fulcro. Valores más altos = respuesta más lenta y estable. Valores más bajos (0.3 a 0.5) = respuesta más rápida pero más nerviosa.

- **`UMBRAL = 2`**: Solo se envían al PC cambios mayores al 2%. Súbelo si la pantalla se mueve demasiado.

## Usos típicos

- **Comparación física de magnitudes** entre dos datasets: "¿pesa más esta categoría o esta otra?"
- **Narrativa visual**: el visitante carga el platillo de un lado con objetos y observa cómo la balanza física y la pantalla se inclinan al mismo tiempo.
- **Decisión interactiva**: dos opciones, el visitante pone monedas en la que prefiere, y al final la balanza muestra la elección colectiva.

## Notas

- Si el teléfono está **parado verticalmente** (lado corto paralelo al brazo) en lugar de acostado, el eje principal cambia: reemplaza las apariciones de `gamma` por `beta` en `sensor.html`.
- La calibración es persistente solo durante la sesión: si recargas la página o reconectas el teléfono, hay que volver a calibrar.
- El sensor de orientación es menos preciso cerca de objetos metálicos grandes.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.