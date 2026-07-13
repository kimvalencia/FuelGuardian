# AGENTS.md

This repository contains a full-stack solution with two main parts:

- Frontend: FuelGuardianApp (Angular application)
- Backend: FuelGuardianWebService (ASP.NET Core web service with EF Core and SQL Server)

## Repository structure

### Frontend: FuelGuardianApp

- Angular workspace and app entry points:
  - angular.json
  - package.json
  - tsconfig.json
  - src/index.html
  - src/main.ts
  - src/styles.scss
- Application code lives under src/app/:
  - app-routing.module.ts / app.routes.ts / app.module.ts: routing and module setup
  - pages/: feature/page-level components
  - services/: Angular services
  - models/: shared data models
  - ui/: reusable UI components
  - tripModule/: trip-related feature module

### Backend: FuelGuardianWebService

- Solution entry point:
  - FuelGuardianWebService.sln
- Main web project:
  - FuelGuardianWebService/Program.cs
  - FuelGuardianWebService/Controllers/: controller-based endpoints
  - FuelGuardianWebService/Endpoints/: minimal API endpoint registrations
- Application/domain layer:
  - FuelGuardianWebService.App/Entities/: EF Core entities
  - FuelGuardianWebService.App/DTOs/: request/response DTOs
  - FuelGuardianWebService.App/BLLs/: business logic
  - FuelGuardianWebService.App/Mappings/: mapping configuration
  - FuelGuardianWebService.App/Migrations/: EF Core migrations
- Tests:
  - FuelGuardianWebService.Tests/

## Development workflow

### Frontend commands

Run these from the FuelGuardianApp folder:

- npm start or npm run start: start the Angular dev server
- npm run build: build the web app
- npm test: run unit tests

### Backend commands

Run these from the FuelGuardianWebService folder:

- dotnet build FuelGuardianWebService.sln
- dotnet test FuelGuardianWebService.Tests/FuelGuardianWebService.Tests.csproj

## Project conventions

- Keep frontend concerns inside FuelGuardianApp/src/app/ and favor feature-oriented folders such as pages/, services/, ui/, and tripModule/.
- When generating Angular components, use the Angular CLI (for example, ng generate component or ng g c) rather than creating files manually so the generated structure, selectors, and styles remain consistent with the app.
- Keep backend HTTP surface in Controllers/ or Endpoints/, and place reusable business logic in FuelGuardianWebService.App/BLLs/ instead of embedding it directly in endpoint handlers.
- When changing data shapes, update the matching entity, DTO, and mapping files together so EF Core and API contracts remain consistent.
- The Angular app is expected to run on http://localhost:4200; the backend CORS policy allows that origin.
- The backend uses SQL Server through the FuelGuardianConn connection string and EF Core migrations under FuelGuardianWebService.App/Migrations/.

## Notes for agents

- Prefer minimal, targeted edits that fit the existing module structure.
- Link to existing documentation when it already exists instead of duplicating it.
- When adding new API behavior, keep it aligned with the current endpoint organization and DTO patterns.
