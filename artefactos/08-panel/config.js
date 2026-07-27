// Declara las páginas Protobject de este artefacto: cuál corre en el PC
// (main) y cuál corre en la tablet/teléfono. Debe ser el último
// <script> del HTML.

// Modo producción: la app está hospedada en HTTPS (GitHub Pages).
Protobject.setProduction(true);

Protobject.initialize([
  {
    name: "Pantalla",
    page: "index.html",
    main: true,
    debug: "master",
  },
  {
    name: "Panel",
    page: "sensor.html",
    debug: "local",
  }
]);
