// Modo producción: la app está hospedada en HTTPS (GitHub Pages).
Protobject.setProduction(true);

Protobject.initialize([
  {
    name: "Pantalla",       // corre en el PC
    page: "index.html",
    main: true,
    debug: "master",
  },
  {
    name: "Sensor",         // corre en el teléfono
    page: "sensor.html",
    debug: "local",
  }
]);
