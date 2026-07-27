// Declara las páginas Protobject de este artefacto: cuál corre en el PC
// (main) y cuál corre en el teléfono. Debe ser el último <script> del HTML.

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
