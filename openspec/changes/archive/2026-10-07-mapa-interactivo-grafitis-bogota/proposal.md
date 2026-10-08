# Proposal

## Why

This project creates an interactive web map to visualize graffiti locations in Bogotá. Currently there is no centralized, accessible way to explore Bogotá's street art geographically. This application will allow users to discover graffiti by location, filter by locality (neighborhood), and view details about each piece.

## What Changes

- New web application with interactive map using Leaflet + OpenStreetMap
- Graffiti markers displayed on map with click-to-view details
- Filtering capability by Bogotá locality
- Object-oriented architecture with `Grafiti` and `MapaGrafitis` classes
- Sample data loaded from JSON file

## Capabilities

### New Capabilities

- `graffiti-map`: Interactive map display with graffiti markers, popup details, and locality filtering
- `graffiti-data`: Data model and loading for graffiti entities (name, description, locality, coordinates)

### Modified Capabilities

None (greenfield project)

## Impact

- New frontend application (HTML, CSS, JavaScript)
- Leaflet library dependency (via CDN)
- Sample data JSON file
- No backend or API dependencies
- Pure client-side implementation