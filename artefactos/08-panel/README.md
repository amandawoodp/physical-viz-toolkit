# Panel con agujeros sobre la pantalla

El usuario toca una pantalla capacitiva a través de agujeros recortados en una lámina de cartón. Cada agujero coincide con una zona táctil programada en la página `sensor.html`. Al tocar una zona, la tablet envía un evento semántico a la pantalla principal y esta actualiza una visualización simple.

Este artefacto funciona como un panel físico de selección: el cartón transforma una pantalla común en un objeto tangible, decorable y temático.

## Materiales

- Tablet o smartphone grande con pantalla táctil
- Computador con navegador Chrome o Safari
- Lámina de cartón rígido del tamaño de la pantalla
- Cortacartón o tijeras
- Cinta adhesiva o masking tape para fijar la plantilla
- Plumones, papeles o decoración para tematizar el panel

## Cómo usar

1. Abre la demo en el computador.
2. Click en `+ Conectar tablet`. Aparece un código QR.
3. Escanea el QR con la tablet o teléfono que funcionará como panel.
4. En la tablet, toca `Pantalla completa`.
5. Coloca la lámina de cartón encima de la pantalla.
6. Alinea los agujeros del cartón con los círculos visibles en la pantalla.
7. Toca a través de los agujeros. La pantalla del computador cambia según la zona seleccionada.

## Componente Protobject

Este artefacto usa `Protobject.Core.send()` para enviar desde la tablet un evento de selección a `index.html`.

No usa cámara ni sensores analógicos. La interacción ocurre directamente sobre la pantalla capacitiva de la tablet.

## Sensor y mapeo de datos

Cada zona táctil envía un objeto semántico con esta estructura:

```js
{
  tipo: "panel",
  accion: "press",
  id: "agua",
  label: "Agua",
  emoji: "💧",
  valor: 78,
  descripcion: "Indicadores asociados a consumo, disponibilidad y cuidado del agua.",
  timestamp: 1710000000000
}
```

El estudiante final no recibe coordenadas crudas ni eventos táctiles del navegador. Solo recibe una selección ya interpretada: `{ tipo, accion, id, label, valor }`.

Las zonas actuales son:

1. Agua
2. Energía
3. Transporte
4. Residuos
5. Áreas verdes
6. Población

Puedes cambiar estos nombres y valores editando el objeto `OPCIONES` en `sensor.html` e `index.html`.

## Construcción física

1. Abre `sensor.html` en la tablet.
2. Activa pantalla completa.
3. Pon el cartón encima de la pantalla.
4. Marca con lápiz la posición de los seis círculos.
5. Retira el cartón.
6. Recorta los agujeros.
7. Vuelve a poner el cartón sobre la tablet.
8. Decora el panel según la narrativa de la visualización.

Los agujeros deben ser suficientemente grandes para que el dedo toque la pantalla con comodidad. Se recomienda hacerlos un poco más grandes que los círculos visibles.

## Ajuste de posiciones

Las posiciones de los agujeros están definidas en CSS dentro de `sensor.html`:

```css
.hole[data-id="agua"]       { left: 20%; top: 28%; }
.hole[data-id="energia"]    { left: 50%; top: 28%; }
.hole[data-id="transporte"] { left: 80%; top: 28%; }
.hole[data-id="residuos"]   { left: 20%; top: 72%; }
.hole[data-id="verde"]      { left: 50%; top: 72%; }
.hole[data-id="poblacion"]  { left: 80%; top: 72%; }
```

Si el cartón no calza bien con la pantalla, ajusta esos porcentajes.

También hay una configuración especial para orientación vertical (`portrait`), pensada para teléfonos o tablets usadas de forma vertical.

## Usos típicos

- **Teclado temático**: cada agujero representa una categoría o acción.
- **Mapa táctil pequeño**: cada agujero corresponde a una zona del mapa.
- **Panel de control escenográfico**: botones físicos decorados para activar partes de una historia.
- **Instrumento musical de cartón**: cada agujero dispara un sonido o estado.
- **Selector de dataset**: cada zona cambia la variable o conjunto de datos que se visualiza.

## Notas

- Este artefacto requiere que el cartón esté bien alineado con la pantalla.
- Conviene usar una tablet por su mayor área de interacción.
- Si se usa un teléfono, es mejor reducir la cantidad de agujeros o usar orientación vertical.
- La pantalla debe estar desbloqueada y sin gestos del sistema que interfieran.
- No requiere permisos de cámara, orientación, NFC ni micrófono.
- El computador y la tablet deben estar conectados mediante Protobject.
- Para probar sin tablet, se pueden usar las teclas `1` a `6` en el computador.
