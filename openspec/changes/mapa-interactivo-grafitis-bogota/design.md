# Design

## Context

This is a greenfield client-side web application. The project has no existing codebase. The application must be a single-page web app using vanilla JavaScript with ES6 classes, Leaflet for mapping, and OpenStreetMap tiles. Data comes from a local JSON file.

See proposal.md for motivation and specs/graffiti-data/spec.md and specs/graffiti-map/spec.md for requirements.

## Goals / Non-Goals

**Goals:**
- Implement `Grafiti` class representing a single graffiti entity
- Implement `MapaGrafitis` class managing the map, markers, and filtering
- Load sample data from `data/grafitis.json`
- Build a responsive UI with map and filter controls
- Zero build step - run directly in browser via file:// or simple HTTP server

**Non-Goals:**
- Backend API or server-side rendering
- User authentication or data persistence
- Real-time updates or collaborative features
- Mobile app or native packaging
- Build tooling (webpack, vite, etc.)

## Decisions

### 1. Architecture: Two main classes (Grafiti, MapaGrafitis)
**Rationale:** The proposal explicitly requires OOP with these two classes. `Grafiti` encapsulates data and validation. `MapaGrafitis` encapsulates all map logic, marker management, and filter coordination.

**Alternatives considered:**
- Single class with all logic - rejected (violates separation of concerns)
- Functional approach - rejected (proposal mandates OOP classes)

### 2. Leaflet via CDN, no bundler
**Rationale:** Simplest deployment - just open index.html. Leaflet is lightweight and CDN-hosted.

**Alternatives considered:**
- npm + bundler - adds complexity for a simple project
- Other map libraries (Mapbox GL, OpenLayers) - Leaflet is simpler for marker-based maps

### 3. Data loading: Fetch API with relative path
**Rationale:** Works with any static file server. JSON structure matches `Grafiti` constructor parameters.

**Alternatives considered:**
- Embedded JS module - less flexible for data updates
- LocalStorage - not needed for static sample data

### 4. Filter UI: Native `<select>` element
**Rationale:** Accessible, no dependencies, works everywhere. Populated dynamically from loaded data.

**Alternatives considered:**
- Custom dropdown component - unnecessary complexity
- Checkboxes for multi-select - requirement is single locality filter

### 5. Map center and zoom: Bogotá fixed center
**Rationale:** All graffiti are in Bogotá. Fixed center avoids empty map on load.

**Alternatives considered:**
- Fit bounds to markers - would require async wait for data load

### 6. Error handling: Console errors + user-visible fallback
**Rationale:** Developer visibility + graceful degradation. If data fails to load, show empty map with error message.

**Alternatives considered:**
- Throw and crash - poor UX
- Retry logic - overkill for static file

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| File:// protocol blocks fetch() | Document requirement to serve via HTTP (e.g., `npx serve`, VS Code Live Server) |
| Leaflet CDN unavailable | Could vendor leaflet.js/leaflet.css locally if needed |
| No TypeScript | Use JSDoc types for IDE support; small codebase minimizes risk |
| JSON structure changes | `Grafiti` constructor validates required fields; fails fast |
| Large dataset performance | Sample data is small (~10-20 items); clustering not needed |

## Migration Plan

Not applicable - greenfield project. Deployment: serve the directory with any static file server.

## Open Questions

None - all technical decisions resolved above.