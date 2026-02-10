# Insurance Dashboard & Account Page — Frontend Test Task

This repository contains a fully implemented frontend dashboard. The goal was to simulate real account management workflows while keeping the codebase clean and scalable.

The project demonstrates my ability to:
- Work with complex UI designs
- Build structured, readable React applications
- Translate business requirements into a clear user interface
- Currently, two official plugins are available:

## Functional Scope

- Work Queue with status-based filtering
- Portfolio goals & KPI tracking
- Accounts table with typed columns
- Policy lifecycle visualization
- Decision support & winnability analysis
- Communication panel (email-like UI)
All logic is implemented on the frontend level with mocked domain data.

## Tech Stack
- React 18
- TypeScript
- Vite
- SCSS Modules
- Modern CSS (Flexbox / Grid)
- Component-based architecture
- Custom UI components (no heavy UI frameworks)

## ------------ Architectural Decisions
## Component Design
- Reusable UI components (Card, Table, Chip, Stepper)
- Feature-based composition for dashboard blocks
- Clear separation between: UI components, Domain models, Mocked data

## Typing Strategy
Strong TypeScript typing for:
- Tables and columns
- Domain entities (accounts, policies, statuses)
- Avoided usage of any
- Explicit union types for statuses, tones, and UI states

## Styling
- SCSS Modules for locally scoped styles
- Layout built using Flexbox and CSS Grid
- Desktop-first approach with adaptive behavior
- No external UI libraries to maintain full control over structure and styling

## Purpose of the Project
This project was created as a technical test assignment to demonstrate:
- Ability to translate a complex Figma design into a working product
- Strong understanding of React + TypeScript
- Attention to UX details and business logic
- Clean, maintainable frontend architecture
- Real-world dashboard patterns (tables, metrics, workflows)
