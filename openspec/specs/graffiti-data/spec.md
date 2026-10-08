# graffiti-data Specification

## Purpose
Defines the data model for graffiti entities and how graffiti data is loaded from a JSON file into the application.

## Requirements

### Requirement: Graffiti entity model
The system SHALL represent each graffiti with a name, description, locality, and geographic coordinates (latitude and longitude).

#### Scenario: Graffiti object creation
- **WHEN** a Graffiti object is instantiated with name, description, locality, latitude, and longitude
- **THEN** the object stores all five properties and exposes them via getters

#### Scenario: Graffiti object validation
- **WHEN** a Graffiti object is instantiated with missing required fields
- **THEN** the object throws an error indicating which fields are required

### Requirement: Graffiti data loading from JSON
The system SHALL load graffiti data from a JSON file containing an array of graffiti objects.

#### Scenario: Successful data load
- **WHEN** the data loader reads a valid JSON file with graffiti array
- **THEN** it returns an array of Graffiti objects with all properties populated

#### Scenario: Invalid JSON file
- **WHEN** the data loader encounters a missing or malformed JSON file
- **THEN** it throws an error describing the issue

#### Scenario: Empty graffiti array
- **WHEN** the JSON file contains an empty array
- **THEN** it returns an empty array without error

### Requirement: Locality filtering
The system SHALL provide a method to filter graffiti by locality name.

#### Scenario: Filter by existing locality
- **WHEN** filterByLocality is called with a locality that exists in the data
- **THEN** it returns only graffiti objects matching that locality

#### Scenario: Filter by non-existent locality
- **WHEN** filterByLocality is called with a locality not in the data
- **THEN** it returns an empty array

#### Scenario: Filter with empty input
- **WHEN** filterByLocality is called with empty or null locality
- **THEN** it returns all graffiti objects (no filtering)
