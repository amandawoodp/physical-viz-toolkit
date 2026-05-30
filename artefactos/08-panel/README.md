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
- No requiere construcción electrónica adicional

## Cómo usar

1. Coloca la tablet o smartphone sobre la mesa, con la **pantalla hacia arriba**.
2. Abre la demo en el computador.
3. Click en "+ Conectar tablet". Aparece un código QR.
4. Escanea el QR con la tablet o teléfono que funcionará como panel.
5. En la tablet, toca **"Pantalla completa"**.
6. Coloca la lámina de cartón encima de la pantalla.
7. Alinea los agujeros del cartón con los círculos numerados visibles en la pantalla.
8. Toca a través de los agujeros. La pantalla del computador muestra el mismo número seleccionado.

## Componente Protobject

`Protobject.Core.send()` — envía desde la tablet un evento semántico hacia `index.html` cada vez que el usuario toca uno de los números del panel.

Este artefacto no usa cámara, orientación, NFC ni micrófono. La interacción ocurre directamente sobre la pantalla capacitiva de la tablet o teléfono.

## Sensor y mapeo de datos

Cada agujero corresponde a una zona táctil genérica. Al tocarla, el código envía un objeto simple, por ejemplo:

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

El estudiante final puede usar `numero`, `marcador` o `valor` para conectar el panel con su propia visualización.

Las zonas base son **1**, **2**, **3**, **4**, **5** y **6**. Se dejaron sin nombres específicos para que cada grupo pueda decidir qué significa cada número en su propio proyecto.

## Usos típicos

- **Selector de categorías**: cada número representa una categoría definida por el grupo.
- **Selector de dataset**: cada número cambia el conjunto de datos mostrado.
- **Panel de control físico**: cada agujero activa una acción distinta.
- **Mapa táctil pequeño**: cada número puede corresponder a una zona del mapa.
- **Instrumento o secuenciador simple**: cada número dispara un sonido, estado o visualización.

## Notas

- **El panel depende de la alineación física**, así que los agujeros del cartón deben coincidir bien con los círculos de la pantalla.
- Conviene usar una tablet por su mayor área de interacción.
- Si se usa un teléfono, es mejor reducir la cantidad de agujeros o usar orientación vertical.
- Los agujeros deben ser suficientemente grandes para que el dedo toque la pantalla con comodidad.
- La pantalla debe estar desbloqueada y sin gestos del sistema que interfieran.
- No requiere permisos de cámara, orientación, NFC ni micrófono.
- El computador y la tablet deben estar conectados mediante Protobject.
