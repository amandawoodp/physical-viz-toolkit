# Lector NFC

El usuario acerca diferentes tarjetas NFC al teléfono y la pantalla del computador identifica cuál es, mostrando su nombre con un color e ícono distintos. El artefacto distingue hasta 4 tarjetas: Bip!, TUC (Tarjeta Universitaria UC), TNE y Carnet de identidad.

## Materiales

- Smartphone **Android con Chrome** (NFC + Web NFC requeridos)
- Computador con navegador Chrome o Safari
- 1 a 4 tarjetas NFC del bolsillo del usuario: Bip!, TUC, TNE, carnet, tarjeta bancaria, credencial de trabajo, etc.

## ⚠️ Compatibilidad

**Este artefacto NO funciona en iPhone.** Apple bloquea Web NFC en Safari iOS a nivel de sistema. Se requiere obligatoriamente Android con Chrome (versión 89 o superior). Esta es una limitación del ecosistema, no de Protobject.

## Cómo usar

1. Abre [la demo en vivo](https://amandawoodp.github.io/physical-viz-toolkit/artefactos/04-nfc/) en el computador.
2. Click en "+ Conectar teléfono". Aparece un código QR.
3. Escanea el QR con un Android usando Chrome.
4. En el Android, toca **"INICIAR LECTOR NFC"**. Chrome pedirá permiso para escanear NFC → permítelo.
5. Toca **"ENTRAR EN MODO APRENDIZAJE"**. El sistema te pedirá acercar cada tarjeta una por una.
6. Acerca tu Bip! a la parte trasera del Android (cerca de la cámara) → "✓ Bip! aprendida".
7. Repite con TUC, TNE y Carnet en el orden que pida la pantalla.
8. Una vez aprendidas, ya estás en modo uso: acerca cualquier tarjeta y el PC muestra su nombre con un color e ícono propios.

Las tarjetas aprendidas se guardan en el navegador del teléfono (`localStorage`), por lo que la próxima vez que abras el sensor ya las recordará. Para empezar de cero, usa el botón "BORRAR TARJETAS APRENDIDAS".

## Componente Protobject

`Protobject.NFC` — accede al chip NFC del teléfono vía la Web NFC API. Cada tarjeta NFC tiene un identificador único permanente; el componente lo expone como un string en el callback `onData`.

## Sensor y mapeo de datos

ID único del tag NFC detectado → comparación con los IDs aprendidos → nombre de la tarjeta ("Bip!", "TUC", "TNE", "Carnet" o "Desconocida") → mensaje al PC → texto + color + ícono en pantalla.

El evento que se envía al PC es **el nombre semántico** de la tarjeta, no el ID crudo. El estudiante final nunca trabaja con strings de hardware del tipo `04:A1:B2:C3:D4:E5`.

## Usos típicos

- **Tarjeta como selector**: cada tarjeta = un dataset distinto (ej: "TUC → datos de la PUC", "Bip! → datos del Transantiago").
- **Tag NFC pegado a un objeto**: pega un tag dentro de un libro, juguete o llavero. El visitante acerca el objeto completo, no una tarjeta anónima. Esto tiene el máximo valor semántico: el objeto mismo activa la visualización.
- **Identificación de usuario en una experiencia museo**: cada visitante usa su propia credencial para "loguear" su recorrido.

## Notas

- **No requiere construir un artefacto físico**. El teléfono se apoya en el Soporte de escritorio (Base A1) o en una Base B, con un letrero de cartón al lado que diga "ACERCA TU TARJETA AQUÍ".
- **El NFC no atraviesa metal.** No pegues tags dentro de tazas metálicas o sobre objetos de aluminio.
- **El sensor NFC del Android suele estar cerca de la cámara trasera**, no en el centro del aparato. Si una tarjeta no se detecta, prueba acercarla a distintos puntos de la parte de atrás del teléfono.
- Cada tarjeta NFC tiene un ID único permanente, así que **una tarjeta nunca se confunde con otra**, ni siquiera entre dos tarjetas del mismo tipo (dos Bip! tienen IDs distintos).
- El teléfono y el computador deben estar en la misma red WiFi.