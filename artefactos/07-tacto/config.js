// Declara las páginas Protobject de este artefacto: la que corre en el
// PC (main) y las dos que corren en los teléfonos (cenital y frontal).
// Debe ser el último <script> del HTML en cada página.

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
    name: "Cenital",
    page: "sensor-cenital.html",
    debug: "local",
  },
  {
    name: "Frontal",
    page: "sensor-frontal.html",
    debug: "local",
  }
]);