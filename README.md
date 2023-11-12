# Prototyping Mini-Project

This repository holds my individual project work for the course "Prototyping"
in the bachelor's degree programme "Business Information Technologies" at
Zurich School of Applied Sciences (ZHAW).

## Project Description

This project is about creating a web based application (prototype) for an
event management system. The application is intended to be used by event
organizers to manage their events and by event participants to register for
events.

## Use Cases

```mermaid
flowchart TB
  Organizer((Organizer)) --> CEvents
  Organizer --> CVenues
  Organizer --> CCategories
  subgraph Use Cases
    CEvents([Create Event]) --> DEvents([See Event Details])
    CEvents --> MEvents([Manage Events])
    CEvents --> REvents([Remove Event])
    CEvents --> Participants([See Participants])
    CVenues([Create Venues]) --> MVenues([Manage Venues])
    CCategories([Create Categories]) --> MCategories([Manage Categories])
    Register([Register for Event])
  end
  Participant((Participant)) --> Register
  Participant --> DEvents
```

## Entity Relationship Diagram

```mermaid
erDiagram
  Event ||--o{ Participant : has
  Event ||--o{ Organizer : has
  Event ||--o{ Venue : has
  Event }o--o{ Category : has
  Event {
    string name
    string description
    string startDateTime
    string endDateTime
    string price
    string maxParticipants
  }
  Participant {
    string firstName
    string lastName
    string email
  }
  Organizer {
    string name
    string email
  }
  Venue {
    string name
    string address
    string city
    string zip
    string country
  }
  Category {
    string name
  }
```
