# Swagger UI Live
Hosted Swagger UI with added support for local files and live updates

## Motivation
[Swagger UI](https://github.com/swagger-api/swagger-ui) does a great job visualizing OpenAPI and Swagger specifications, but it lacks support for both local files and live updates to changes. To overcome these limitations, the [`swagger-ui-watcher` tool](https://github.com/moon0326/swagger-ui-watcher) was created, on whose idea this package is built on. Instead of providing a single tool for the whole workflow of watching file changes, bundling the files by resolving `$ref` elements and hosting a live visualization in Swagger UI, this package just focuses on the last part to allow the user using a custom implementation (e.g. in a build tool) for the others.

## Installation


## Usage

## License
The software is licensed under the [MIT license](https://github.com/lukoerfer/swagger-ui-live/blob/master/LICENSE).
