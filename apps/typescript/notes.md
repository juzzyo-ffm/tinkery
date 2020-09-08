create boilerplate tsconfig.js
`tsc --init`

target: compiles code to specific compatible version.

if cursor is within value, control + space brings up options.
"target": "<cursor here>ES6"

lib. if empty, defaults are assumed based on target. e.g. es6 -> dom and es6 libraries are loaded by default.

sourceMap: true
creates .map files, which link compiled js files to the source (.ts) files, so the souce files can be used for debugging under the sources tab in the browser (inc adding breakpoints to source files)

src and dist folders must be accessible to the server.
