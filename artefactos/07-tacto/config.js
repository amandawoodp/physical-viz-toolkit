// Tres páginas porque hay tres dispositivos en juego.
Protobject.setProduction(true);

Protobject.initialize([
  {
    name: "Pantalla",
    page: "index.html",
    main: true,             // corre en el PC
    debug: "master",
  },
  {
    name: "Cenital",
    page: "sensor-cenital.html",   // corre en el teléfono cenital
    debug: "local",
  },
  {
    name: "Frontal",
    page: "sensor-frontal.html",   // corre en el teléfono frontal
    debug: "local",
  }
]);