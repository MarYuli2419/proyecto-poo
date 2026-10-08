# Tasks

## 1. Project Setup

- [ ] 1.1 Create project directory structure (index.html, css/, js/, data/) and verify all directories exist
- [ ] 1.2 Create sample data file `data/grafitis.json` with 10-15 graffiti entries covering multiple Bogotá localities and verify JSON is valid
- [ ] 1.3 Add Leaflet CSS and JS via CDN in index.html and verify no console errors on load

## 2. Grafiti Class Implementation

- [ ] 2.1 Implement `Grafiti` class in `js/grafiti.js` with constructor, getters, and validation per spec and verify instantiation works with valid data
- [ ] 2.2 Add validation to throw descriptive errors for missing required fields and verify error is thrown for incomplete data
- [ ] 2.3 Add static factory method `fromJSON()` to create Graffiti from plain object and verify it produces equivalent instances

## 3. Data Loading Module

- [ ] 3.1 Implement `cargarGrafitis()` async function in `js/data-loader.js` using fetch to load `data/grafitis.json` and verify it returns array of Graffiti objects
- [ ] 3.2 Add error handling for network errors, invalid JSON, and empty array and verify appropriate errors are thrown
- [ ] 3.3 Implement `filtrarPorLocalidad(grafitis, localidad)` function and verify it returns correct filtered results including "Todas" case

## 4. MapaGrafitis Class Implementation

- [ ] 4.1 Implement `MapaGrafitis` class in `js/mapa-grafitis.js` with constructor initializing Leaflet map centered on Bogotá and verify map renders
- [ ] 4.2 Implement `mostrarGrafitis(grafitis)` method to create markers with popups for each graffiti and verify markers appear at correct coordinates
- [ ] 4.3 Implement `filtrarPorLocalidad(localidad)` method to show/hide markers based on filter and verify filter updates map immediately
- [ ] 4.4 Implement `obtenerLocalidadesUnicas(grafitis)` method to extract unique localities for filter dropdown and verify it returns sorted unique list

## 5. UI Integration

- [ ] 5.1 Create HTML structure in index.html with map container, filter select, and error message area and verify layout renders correctly
- [ ] 5.2 Add CSS in `css/styles.css` for responsive map (full viewport), styled filter control, and error states and verify visual appearance
- [ ] 5.3 Wire up initialization in `js/app.js`: load data, instantiate MapaGrafitis, populate filter dropdown, attach event listeners and verify full app works end-to-end
- [ ] 5.4 Handle loading and error states in UI (show spinner while loading, show error message if data fails) and verify states display correctly

## 6. Verification & Polish

- [ ] 6.1 Test all localities filter correctly and verify each shows only matching markers
- [ ] 6.2 Test marker popups show correct name, description, locality for all graffiti and verify content matches JSON data
- [ ] 6.3 Test app works when served via `npx serve` or VS Code Live Server (file:// blocks fetch) and verify no console errors
- [ ] 6.4 Verify code follows OOP structure with only Grafiti and MapaGrafitis classes as required and no global functions except app initialization