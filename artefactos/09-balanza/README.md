# Balanza de datos

El usuario pone objetos en los dos platillos de una balanza física que tiene el teléfono fijado al eje central como fulcro. La pantalla del computador muestra una balanza animada que se inclina hacia el lado que pesa más, con un indicador del porcentaje de desbalance.

## Materiales

- Smartphone (iPhone o Android con sensor de orientación)
- Computador con navegador Chrome o Safari
- **Estructura LEGO Technic** que forme una balanza de dos platillos con un eje central horizontal. El teléfono va **atravesado por el eje Technic** (su lado largo paralelo al brazo de la balanza).
- **Base C** — Adaptador para conectar el teléfono a piezas LEGO Technic
- Dos platillos: cajas de cartón, vasitos o cualquier recipiente que pueda colgar de los extremos del brazo
- Objetos para pesar: monedas, lápices, gomas, etc.

Este artefacto es el **ejemplo demostrativo obligatorio** de la Base C según la guía del toolkit: aprovecha la precisión mecánica de los engranajes y ejes Technic para conseguir un fulcro fluido y reproducible que sería muy difícil de lograr con cartón solo.

## Cómo usar

1. Construye la balanza en LEGO Technic con el eje central horizontal donde encaja el teléfono.
2. Atraviesa el teléfono con el eje Technic usando la Base C, dejando que pivote libremente.
3. Cuelga los dos platillos de los extremos del brazo.
4. Abre la demo en vivo en el computador.
5. Click en "+ Conectar teléfono". Aparece un código QR.
6. Escanea el QR con el iPhone/Android.
7. **Permiso de orientación (iOS)**: aparecerá un botón rojo. Tócalo y permite el acceso.
8. **Calibración de tres pasos** (la balanza se autocalibra al rango físico real de tu montaje, así que aunque solo se incline ±5° en total, la pantalla del PC siempre cubre todo el rango -100% a +100%):
   - **Paso 1 — Equilibrio**: pon la balanza con ambos platillos vacíos (o con pesos iguales) y toca el botón. Ese ángulo se guarda como "cero".
   - **Paso 2 — Máximo a la izquierda**: pon objetos solo en el platillo izquierdo hasta la máxima inclinación física de ese lado y toca el botón. Ese ángulo se guarda como "-100%".
   - **Paso 3 — Máximo a la derecha**: saca los objetos del izquierdo y ponlos en el derecho hasta la máxima inclinación, y toca el botón. Ese ángulo se guarda como "+100%".
9. Pon objetos en un platillo. La balanza física se inclina y la pantalla del PC refleja el desbalance en tiempo real.

Si quieres recalibrar (cambiaste los platillos, moviste la balanza o quieres ajustarla a otra escena), toca "↺ Reiniciar calibración" y repite los tres pasos.

## Sensor Protobject utilizado

El artefacto lee el sensor de orientación del teléfono a través de la API estándar `deviceorientation`, específicamente el valor `gamma` (inclinación lateral izquierda-derecha). Cuando la balanza se inclina hacia un lado, el teléfono incorporado al eje central también se inclina.

`event.gamma` del DOM → diferencia respecto al equilibrio calibrado → normalización proporcional al rango izquierda/derecha calibrado → zona muerta (anti-temblor) → suavizado exponencial → enviado al PC solo cuando cambia más de `UMBRAL`. El estudiante final recibe un evento semántico: un número con signo que indica qué lado pesa más y por cuánto.

## Cómo adaptarlo a otros usos

El patrón "dos magnitudes compiten por inclinar un eje, calibrado a su rango físico real" sirve para cualquier comparación física de dos cantidades:

- **Comparación física de magnitudes entre dos datasets**: "¿pesa más esta categoría o esta otra?" — cada platillo representa un grupo de datos y el peso físico de los objetos representa su magnitud.
- **Decisión colectiva o votación**: dos opciones, el visitante pone una moneda o ficha en la que prefiere, y al final la balanza muestra la preferencia acumulada del grupo.
- **Narrativa visual de tensión entre dos fuerzas**: cualquier historia con dos polos en conflicto (costo vs. beneficio, oferta vs. demanda) puede representarse cargando objetos en cada lado mientras se cuenta la historia.

Para adaptarlo, solo hay que recalibrar los tres puntos si cambia el montaje físico; la conversión de `gamma` a porcentaje y la animación del brazo no dependen de qué representen los platillos.

## Parámetros ajustables

- **`ZONA_MUERTA`** (`sensor.html`, default 15): si el desbalance crudo es menor a este % en valor absoluto, se trata como equilibrio (0%). Resuelve el problema de "nunca alcanza el cero" por temblor o pequeños desequilibrios físicos. Súbelo (a 20–25) si tu balanza nunca llega al equilibrio incluso vacía.
- **`SUAVIZADO`** (`sensor.html`, default 0.7, rango 0–1): filtra micro-vibraciones del fulcro. Valores más altos = respuesta más lenta y estable; más bajos (0.3–0.5) = respuesta más rápida pero más nerviosa.
- **`UMBRAL`** (`sensor.html`, default 2): solo se envían al PC cambios mayores a este % de desbalance. Súbelo si la pantalla se mueve demasiado.
- **`ROTACION_POR_PORCENTAJE`** (`index.html`, default 0.6): grados de rotación visual del brazo por cada 1% de desbalance recibido. Puramente estético — súbelo para una animación más drástica, bájalo para una más sutil.

## Notas técnicas

- Si el teléfono está **parado verticalmente** (lado corto paralelo al brazo) en lugar de acostado, el eje principal cambia: reemplaza las apariciones de `gamma` por `beta` en `sensor.html`.
- La calibración es persistente solo durante la sesión: si recargas la página o reconectas el teléfono, hay que volver a calibrar.
- El sensor de orientación es menos preciso cerca de objetos metálicos grandes.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.
