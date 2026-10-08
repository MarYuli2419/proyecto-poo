# Spec Delta

## Purpose

Defines the interactive map behavior for displaying graffiti markers, showing details on click, and filtering by locality.

## ADDED Requirements

### Requirement: Map initialization
The system SHALL initialize a Leaflet map centered on Bogotá with OpenStreetMap tiles.

#### Scenario: Map loads successfully
- **WHEN** the map component initializes
- **THEN** a Leaflet map is rendered centered on Bogotá (approx. 4.7110° N, 74.0721° W) with zoom level 11
- **THEN** OpenStreetMap tile layer is visible

### Requirement: Graffiti markers display
The system SHALL display all graffiti as markers on the map at their geographic coordinates.

#### Scenario: Markers rendered for all graffiti
- **WHEN** the map receives a list of Graffiti objects
- **THEN** a marker is placed at each graffiti's latitude/longitude
- **THEN** each marker is clickable

#### Scenario: Marker popup shows graffiti details
- **WHEN** a user clicks on a graffiti marker
- **THEN** a popup opens showing the graffiti's name, description, and locality

#### Scenario: No graffiti data
- **WHEN** the map receives an empty graffiti array
- **THEN** no markers are displayed
- **THEN** the map remains functional

### Requirement: Locality filtering on map
The system SHALL filter displayed markers by selected locality.

#### Scenario: Filter markers by locality
- **WHEN** a user selects a locality from the filter control
- **THEN** only markers for graffiti in that locality are displayed
- **THEN** markers for other localities are hidden

#### Scenario: Show all localities
- **WHEN** a user selects "Todas" (all) in the filter control
- **THEN** all markers are displayed

#### Scenario: Filter control displays unique localities
- **WHEN** the filter control renders
- **THEN** it lists all unique localities from the graffiti data plus "Todas" option

### Requirement: Map and filter integration
The system SHALL coordinate between the map display and the locality filter.

#### Scenario: Initial state shows all graffiti
- **WHEN** the application loads
- **THEN** the map displays all graffiti markers
- **THEN** the filter defaults to "Todas"

#### Scenario: Filter change updates map immediately
- **WHEN** user changes the locality filter
- **THEN** the map markers update without page reload