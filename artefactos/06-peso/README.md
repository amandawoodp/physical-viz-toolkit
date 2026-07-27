# Sensor de peso

El usuario aprieta un globo lateralmente. El teléfono, apoyado sobre el globo, se inclina proporcionalmente a la fuerza de apriete; la pantalla del computador muestra esa intensidad como un porcentaje (0–100%) y una barra vertical que crece con un degradado verde-amarillo-rojo.

## Materiales

- Smartphone (iPhone o Android con sensor de orientación)
- Computador con navegador Chrome o Safari
- Un globo inflado (tamaño mediano, no demasiado firme)
- Masking tape para fijar la base del teléfono a la mesa
- Un soporte simple que mantenga el teléfono apoyado sobre el globo (puede ser cartón o LEGO Technic)

## Cómo usar

1. Pega la base del teléfono a la mesa con masking tape y apoya su esquina superior sobre el globo, de modo que apretar el globo incline el teléfono.
2. Abre la demo en vivo en el computador.
3. Click en "+ Conectar teléfono". Aparece un código QR.
4. Escanea el QR con el iPhone/Android.
5. **Permiso de orientación (iOS)**: aparecerá un botón rojo "PEDIR PERMISO DE ORIENTACIÓN". Tócalo y permite el acceso cuando iOS lo solicite.
6. **Calibración en dos pasos**:
   - Con el globo sin apretar, toca **"PASO 1: SIN APRETAR EL GLOBO"**.
   - Aprieta el globo al máximo (todo lo que se va a apretar en uso real) y, mientras lo aprietas, toca **"PASO 2: APRETANDO AL MÁXIMO"**.
7. ¡Listo! Aprieta el globo con distinta fuerza. La pantalla del PC muestra el porcentaje y la barra sube o baja en tiempo real.

## Sensor Protobject utilizado

El artefacto lee el sensor de orientación del teléfono a través de la API estándar `deviceorientation` del navegador, específicamente el valor `beta` (inclinación adelante-atrás), que cambia según cuánto se hunde el teléfono al apretar el globo.

`event.beta` del DOM → normalización entre los dos puntos calibrados (reposo=0%, máximo=100%) → zona muerta (ignora micro-vibraciones) → suavizado exponencial (evita saltos bruscos) → número entero 0–100 enviado al PC solo cuando cambia lo suficiente. El estudiante final nunca ve el ángulo crudo, solo el porcentaje ya procesado.

## Cómo adaptarlo a otros usos

El patrón "un objeto blando se deforma bajo presión y esa deformación inclina el teléfono" sirve para cualquier sensor de intensidad continua sin necesitar una celda de carga real:

- **Control de volumen o velocidad por presión**: en vez de mostrar una barra, usa el porcentaje para controlar el volumen de un audio o la velocidad de una animación — mientras más se aprieta, más rápido/fuerte.
- **Simulación de "esfuerzo" o "estrés" en una narrativa interactiva**: úsalo como un dial de intensidad emocional que el usuario controla apretando un objeto blando (una pelota antiestrés, una esponja).
- **Medidor de fuerza en una demostración física**: cualquier superficie deformable (cojín, plastilina, esponja) bajo el teléfono puede convertirse en un sensor de "cuánta fuerza estoy aplicando", útil para enseñar conceptos de presión o fuerza en visualizaciones educativas.

Lo que cambia en cada caso es el objeto blando bajo el teléfono y qué representa el porcentaje en `index.html`; la calibración de dos puntos y el suavizado en `sensor.html` se mantienen igual.

## Parámetros ajustables

Todos están en `sensor.html`:

- **`ZONA_MUERTA`** (default 8): porcentaje mínimo de intensidad cruda para que cuente como apriete real; por debajo se considera 0. Súbelo si el globo "tiembla" solo por vibraciones de la mesa.
- **`SUAVIZADO`** (default 0.5, rango 0–1): cuánto peso tiene la lectura anterior frente a la nueva. `0` = sin suavizado (reacciona instantáneo pero puede saltar); cerca de `1` = muy suave pero lento para reaccionar.
- **`UMBRAL`** (default 2): cambio mínimo en % que dispara un nuevo envío al PC. Súbelo para reducir tráfico de red; bájalo para máxima sensibilidad.

## Notas técnicas

- Requiere calibración de dos toques cada vez que se monta o reorienta el sistema, ya que depende de la firmeza específica del globo y de cómo quede apoyado el teléfono.
- En iPhone es obligatorio tocar el botón "PEDIR PERMISO DE ORIENTACIÓN" antes de calibrar.
- Si en el Paso 2 el ángulo capturado es igual al del Paso 1 (rango de calibración inválido = 0), el sensor lo advierte en pantalla; hay que reiniciar la calibración y apretar con más fuerza real en el segundo paso.
- El sensor de orientación es menos preciso cerca de objetos metálicos grandes (laptops, parlantes). Aleja el conjunto si los valores se mueven solos.
- El teléfono y el computador deben estar en la misma red WiFi.
- Probado en iPhone con Safari. En Android usar Chrome.
