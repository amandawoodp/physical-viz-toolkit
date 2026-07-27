# Panel con agujeros sobre la pantalla

El usuario toca una pantalla capacitiva a través de agujeros recortados en una lámina de cartón. Cada agujero coincide con un número visible en la tablet o teléfono, y la pantalla del computador refleja en tiempo real el mismo número seleccionado.

Esta versión base es deliberadamente genérica: usa solo los números **1, 2, 3, 4, 5 y 6**, sin etiquetas temáticas ni emojis, para que cada grupo pueda reutilizar el panel con su propio dataset, narrativa o visualización.

## Materiales

- Tablet o smartphone grande con pantalla táctil
- Computador con navegador Chrome o Safari
- Lámina de cartón rígido del tamaño de la pantalla
- Cortacartón o tijeras
- Cinta adhesiva o masking tape para fijar la plantilla
- Plumones, papeles o materiales para decorar el panel

## Cómo usar

1. Coloca la tablet o smartphone sobre la mesa, con la **pantalla hacia arriba**.
2. Abre la demo en vivo en el computador.
3. Click en "+ Conectar tablet". Aparece un código QR.
4. Escanea el QR con la tablet o teléfono que funcionará como panel.
5. En la tablet, toca **"Pantalla completa"**.
6. Coloca la lámina de cartón encima de la pantalla.
7. Alinea los agujeros del cartón con los círculos numerados visibles en la pantalla.
8. Toca a través de los agujeros. La pantalla del computador muestra el mismo número seleccionado.

## Sensor Protobject utilizado

Este artefacto no usa cámara, orientación, NFC ni micrófono: la interacción ocurre directamente sobre la pantalla capacitiva de la tablet o teléfono, y `Protobject.Core.send()` envía un evento semántico hacia `index.html` cada vez que el usuario toca uno de los números del panel:

```js
{
  tipo: "panel",
  accion: "press",
  id: "zona1",
  numero: "1",
  marcador: "1",
  valor: 1
}
```

El estudiante final puede usar `numero`, `marcador` o `valor` para conectar el panel con su propia visualización — se envían los tres formatos por comodidad, no hace falta usarlos todos.

## Cómo adaptarlo a otros usos

El patrón "agujeros de cartón sobre una pantalla táctil, cada uno dispara un evento numerado" sirve para cualquier panel de botones físicos sin electrónica:

- **Mapa táctil**: dibuja o pega un mapa sobre el cartón y perfora un agujero por cada ciudad o región; cada número pasa a representar un lugar en vez de un dígito genérico.
- **Instrumento o secuenciador simple**: cada agujero dispara un sonido o una nota distinta, útil para sonificación de datos.
- **Panel de control de una visualización**: cada número cambia de vista, filtra una categoría, o cambia el dataset mostrado en una visualización más grande en el PC.

Para adaptarlo, cambia las etiquetas visibles en los `.hole` de `sensor.html` (y los `.mini` de `index.html`) por las que necesite tu caso de uso; el mecanismo de envío y recepción no cambia.

## Parámetros ajustables

- **Cantidad y etiquetas de zonas** (`sensor.html` y `index.html`): la versión base trae 6 botones numerados 1–6. Agrega o quita elementos `.hole`/`.mini` con su `data-num` correspondiente para tener más o menos zonas, o cambia el texto visible para usar palabras/íconos en vez de números.

## Notas técnicas

- **El panel depende de la alineación física**, así que los agujeros del cartón deben coincidir bien con los círculos de la pantalla.
- Conviene usar una tablet por su mayor área de interacción.
- Si se usa un teléfono, es mejor reducir la cantidad de agujeros o usar orientación vertical.
- Los agujeros deben ser suficientemente grandes para que el dedo toque la pantalla con comodidad.
- La pantalla debe estar desbloqueada y sin gestos del sistema que interfieran.
- No requiere permisos de cámara, orientación, NFC ni micrófono.
- El computador y la tablet deben estar en la misma red WiFi.
