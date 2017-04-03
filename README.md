# Kgproj

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Installation

Run `npm i` to install project's dependencies

## Development server

Run `ng serve --aot` for a dev server in AoT mode. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build --aot -prod` to create production-ready AoT build. The build artifacts will be stored in the `dist/` directory.

You can serve it locally with local-web-server:

$ npm i -g local-web-server
$ ws --spa --port 3000 --directory %path-to-dist-folder%

## Style guide
Code structure follows [Angular Style Guide](https://angular.io/styleguide). Post functionality is located is a separate posts module to make it isolated from the rest of the app. For the sake of speed Posts module is not lazy loaded. To make it lazy loadable, app should have outlet on top level and refer to Posts module via router link rather than import it directly.

Posts and Tracker API logic is located in separate singleton services, they could be shared between all Posts directives. As application structure could rely on more complex API and Auth logic (for ex. using JWT, custom headers and data structure with specific response statuses) it could be split into several global singleton services which could implement or extend each other.

Error handling is not currently implemented as it was not a part of original task. It could be done via global shared singleton service which would invoke global alert component block on app component level.  

Unit and integration tests were not implemented due they were not a part of original task. Usually I use Angular-CLI pre-build set of testing tools and write tests in this order: services->components->directives->pipes->modules->routes

## Further help

To get more help on the Angular CLI check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
