# Balanza de datos

El usuario pone objetos en los dos platillos de una balanza física que tiene el teléfono fijado al eje central como fulcro. La pantalla del computador muestra una balanza animada que se inclina hacia el lado que pesa más, con un indicador del porcentaje de desbalance y el nombre del lado que está ganando peso.

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
5. (Opcional) En `index.html`, cambia las variables `NOMBRE_IZQ` y `NOMBRE_DER` por los nombres de tus dos categorías ("DEMANDA"/"OFERTA", "ANTES"/"DESPUÉS", etc).
6. Click en "+ Conectar teléfono". Aparece un código QR.
7. Escanea el QR con el iPhone/Android.
8. **Permiso de orientación (iOS)**: aparecerá un botón rojo. Tócalo y permite el acceso.
9. **Calibración de un toque**: pon la balanza en equilibrio (platillos vacíos o con pesos iguales) y toca **⚖️ CALIBRAR EQUILIBRIO**.
10. Pon objetos en un platillo. La balanza física se inclina y la pantalla del PC refleja el desbalance en tiempo real.

## Sensor utilizado

El artefacto lee el sensor de orientación del teléfono a través de la API estándar `deviceorientation`, específicamente el valor `gamma` (inclinación lateral izquierda-derecha).

Cuando la balanza se inclina hacia un lado, el teléfono que está incorporado al eje central también se inclina. La diferencia respecto al equilibrio calibrado se convierte en un porcentaje de desbalance de -100% a +100%.

## Sensor y mapeo de datos

`event.gamma` del DOM → diferencia respecto al equilibrio calibrado → normalización a porcentaje [-100..+100] → suavizado exponencial → enviado al PC solo cuando cambia más de 2%.

El estudiante final recibe un evento semántico: un número con signo que indica qué lado pesa más y por cuánto.

## Usos típicos

- **Comparación física de magnitudes** entre dos datasets: "¿pesa más esta categoría o esta otra?"
- **Narrativa visual**: el visitante carga el platillo de "lado A" con objetos y observa cómo la balanza física y la pantalla se inclinan al mismo tiempo.
- **Decisión interactiva**: dos opciones, el visitante pone monedas en la que prefiere, y al final la balanza muestra la elección colectiva.

## Notas

- Si el teléfono está **parado verticalmente** (lado corto paralelo al brazo) en lugar de acostado, el eje principal cambia: reemplaza las 4 apariciones de `gamma` por `beta` en `sensor.html`.
- Requiere calibración cada vez que se monta o reorienta la balanza.
- El parámetro `GRADOS_AL_100` en `sensor.html` define qué inclinación equivale al 100% de desbalance. Si tu balanza se inclina poco con objetos livianos, baja este valor (más sensible). Si se satura rápido, súbelo.
- El sensor de orientación es menos preciso cerca de objetos metálicos grandes.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.