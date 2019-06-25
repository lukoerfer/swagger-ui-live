# Swagger UI Live
Hosted Swagger UI with added support for local files and live updates

## Motivation
[Swagger UI](https://github.com/swagger-api/swagger-ui) does a great job visualizing OpenAPI and Swagger specifications, but it lacks support for both local files and live updates to changes. To overcome these limitations, the [`swagger-ui-watcher` tool](https://github.com/moon0326/swagger-ui-watcher) was created, on whose idea this package is built on. Instead of providing a single tool for the whole workflow of watching file changes, bundling the files by resolving `$ref` elements and hosting a live visualization in Swagger UI, this package just focuses on the last part to allow the user using a custom implementation (e.g. in a build tool) for the others.

## Installation
Since the package is available on [NPM](https://www.npmjs.com/package/swagger-ui-live), it can easily be installed:

```
npm install swagger-ui-live
```

Because the actual Swagger UI distribution is just registered as a peer dependency to allow using any version of Swagger UI, it needs to be installed manually:

```
npm install swagger-ui-dist[@version]
```

## Usage
Once the package (and `swagger-ui-dist`) is installed, it can be used by calling the exported method with a string containing the specification as first argument:

``` javascript
const fs = require('fs')
const swaggerLive = require('swagger-ui-live')

var spec = fs.readFileSync('path/to/spec.json', 'utf-8')
var server = swaggerLive(spec)
```

Swagger UI should now be hosted at `http://localhost:3000/` serving the documentation for the specification from the given file. The returned `server` object can be used to `stop()` the server or to update the spec at any time (e.g. periodically or after detecting a change with a file watcher):

``` javascript
server.update(spec)
```

### Example: Gulp task
One possible use case is the integration into a build tool like Gulp:

``` javascript
const gulp = require('gulp')
const fs = require('fs')
const swaggerLive = require('swagger-ui-live')

var ui

function visualize() {
    return fs.promises.readFile('spec.json', 'utf-8')
        .then(ui ? ui.update : spec => ui = swaggerLive(spec))
}

exports.autovisualize = gulp.watch('spec.json', visualize)
```

This example can easily extended by other tasks to bundle multiple specification files or add other kinds of preprocessing. The resulting modularity is the biggest advantage over the more popular [`swagger-ui-watcher` tool](https://github.com/moon0326/swagger-ui-watcher).

### Options

```
swaggerLive(spec [,options])
```

The exposed method supports an optional second argument called `options` to customize the package. The supported options are:

- `port`: Gets passed to [`http.server.listen`](https://nodejs.org/api/http.html#http_server_listen) as `port` argument, defaults to `3000`
- `host`: Gets passed to [`http.server.listen`](https://nodejs.org/api/http.html#http_server_listen) as `host` argument, defaults to `'127.0.0.1'`

## License
The software is licensed under the [MIT license](https://github.com/lukoerfer/swagger-ui-live/blob/master/LICENSE).
