# Insurance Dashboard & Account Page — Frontend Test Task

This repository contains a fully implemented frontend dashboard. The goal was to simulate real account management workflows while keeping the codebase clean and scalable.

The project demonstrates my ability to:
- Work with complex UI designs
- Build structured, readable React applications
- Translate business requirements into a clear user interface

## Live Demo
The application is deployed and publicly available via Azure Static Web Apps:

👉 Live demo:
https://polite-mushroom-087f01d03.6.azurestaticapps.net

Deployment & CI/CD
- Hosted on Azure Static Web Apps
- Continuous deployment configured via GitHub Actions
- Automatic rebuild and redeploy on every push to the main branch
- Production build generated using Vite

! Note: The application uses mocked data and does not require authentication.

## Functional Scope

- Work Queue with status-based filtering
- Portfolio goals & KPI tracking
- Accounts table with typed columns
- Policy lifecycle visualization
- Decision support & winnability analysis
- Communication panel (email-like UI)
All logic is implemented on the frontend level with mocked domain data.

## Tech Stack
- React 19
- TypeScript
- Vite
- SCSS Modules
- Modern CSS (Flexbox / Grid)
- Component-based architecture
- Custom UI components (no heavy UI frameworks)

## AI Tools Usage
AI tools (GPT) were used selectively to:
- Discuss architectural decisions and component boundaries
- Refine TypeScript typings and improve type safety
- Review and simplify complex React logic
- Improve code readability and naming

All core logic, structure, and implementation decisions were made manually.
AI was used as a supporting tool, not as a code generator.

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
- Desktop-first approach aligned with a 1920px design, with adaptive behavior
- No external UI libraries to maintain full control over structure and styling

## Purpose of the Project
This project was created as a technical test assignment to demonstrate:
- Ability to translate a complex Figma design into a working product
- Strong understanding of React + TypeScript
- Attention to UX details and business logic
- Clean, maintainable frontend architecture
- Real-world dashboard patterns (tables, metrics, workflows)
