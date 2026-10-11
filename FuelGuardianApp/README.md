# FuelGuardian

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Environment configuration

The backend base URL is read from a `.env` file at the project root, so it can be
changed without touching application code:

```sh
# FuelGuardianApp/.env
BASE_URL=http://localhost/fuelguardianservice/
```

Copy `.env.example` to `.env` and adjust `BASE_URL` as needed (include the
trailing slash). `.env` is git-ignored; `.env.example` documents the available keys.

`npm run config` reads `.env` and generates `src/assets/env.js`, which exposes the
values on `window.__env` at runtime. This runs automatically before `start`,
`build`, `watch`, and `test` via npm lifecycle hooks. `HttpClientService` resolves
every request against the base URL exposed by `AppConfigService`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
