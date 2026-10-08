# Mapa Interactivo de Grafitis de Bogotá

Aplicación web interactiva que muestra la ubicación de grafitis en Bogotá mediante un mapa basado en Leaflet y OpenStreetMap.

## Características

- **Mapa interactivo** centrado en Bogotá con tiles de OpenStreetMap
- **Marcadores** para cada grafiti con su ubicación geográfica
- **Popups informativos** al hacer clic en un marcador (nombre, descripción, localidad)
- **Filtro por localidad** para mostrar solo grafitis de una zona específica
- **Diseño responsive** que funciona en desktop y móvil
- **Arquitectura orientada a objetos** con clases `Grafiti` y `MapaGrafitis`
- **Carga de datos** desde archivo JSON local

## Cómo ejecutar

### Requisitos

- Node.js (para usar `npx serve`) o cualquier servidor estático
- Navegador web moderno

### Pasos

1. Abre una terminal en la carpeta del proyecto
2. Ejecuta:
   ```bash
   npx serve
   ```
3. Abre tu navegador en **http://localhost:3000**

> **Nota:** La aplicación debe servirse vía HTTP (no abrir `index.html` directamente con `file://`), ya que el navegador bloquea las peticiones `fetch` a archivos locales por seguridad.

### Alternativas

- **VS Code Live Server:** Extensión "Live Server" → clic derecho en `index.html` → "Open with Live Server"
- **Python:** `python -m http.server 8000` → abre http://localhost:8000
- **PHP:** `php -S localhost:8000` → abre http://localhost:8000

## Estructura del proyecto

```
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos responsive
├── js/
│   ├── grafiti.js      # Clase Grafiti (modelo de datos)
│   ├── data-loader.js  # Funciones de carga y filtrado de datos
│   ├── mapa-grafitis.js # Clase MapaGrafitis (lógica del mapa)
│   └── app.js          # Inicialización de la aplicación
├── data/
│   └── grafitis.json   # Datos de ejemplo (15 grafitis)
└── openspec/           # Especificaciones y planificación (OpenSpec)
```

## Datos de ejemplo

**Importante:** Los datos en `data/grafitis.json` son **datos de ejemplo ficticios** creados únicamente para demostrar el funcionamiento de la aplicación. **No corresponden a grafitis reales** ubicados en Bogotá.

El archivo contiene 15 entradas distribuidas en 8 localidades:
- La Candelaria (2)
- Teusaquillo (1)
- Chapinero (3)
- Suba (2)
- Kennedy (2)
- Bosa (2)
- Usaquén (2)
- Engativá (1)

## Tecnologías utilizadas

- **Leaflet 1.9.4** - Librería de mapas interactivos (vía CDN)
- **OpenStreetMap** - Capa base de tiles del mapa
- **JavaScript ES6+** - Clases, módulos, async/await
- **HTML5 / CSS3** - Estructura y estilos responsive

## Arquitectura

La aplicación sigue principios de **programación orientada a objetos**:

| Clase | Responsabilidad |
|-------|-----------------|
| `Grafiti` | Modelo de datos: nombre, descripción, localidad, coordenadas. Incluye validación y métodos `fromJSON()` / `toJSON()`. |
| `MapaGrafitis` | Controlador del mapa: inicialización Leaflet, gestión de marcadores, popups, filtrado visual por localidad. |
| `data-loader.js` | Módulo de utilidades: carga asíncrona (`cargarGrafitis`), filtrado (`filtrarPorLocalidad`), utilidades (`obtenerLocalidadesUnicas`). |
| `app.js` | Punto de entrada: orquesta la carga, inicializa el mapa, conecta UI y eventos. |

## Licencia

Proyecto educativo / demostrativo.