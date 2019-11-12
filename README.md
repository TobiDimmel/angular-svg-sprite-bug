# angular-svg-sprite-issue

This project reproduces a bug with [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader) in extract mode when integrating with [Angular CLI](https://github.com/angular/angular-cli).

## Background to the integration

Angular CLI uses internally [webpack](https://github.com/webpack/webpack) to build an Angular app and handles in general the whole webpack configuration for you. But it also provides an extension point - called [Builders](https://angular.io/guide/cli-builder). With the builder [@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack) you get access to the webpack configuration that was created by Angular CLI and you can adjust it to your needs. At this point you can integrate the svg-sprite-loader how it is shown by this minimal repository.

## The issue

In development everthing works as expected, but when you build for production the following error is thrown:
```
angular-svg-sprite-issue\node_modules\@angular-devkit\build-webpack\src\utils.js:17
                id: chunk.id.toString(),
                             ^

TypeError: Cannot read property 'toString' of null
```
Although the error is thrown in the package [@angular-devkit/build-webpack](https://www.npmjs.com/package/@angular-devkit/build-webpack) the root cause lies in the plug-in of svg-sprite-loader. In the plug-in a new chunk for the SVG sprite is added to the webpack compilation without setting its `id` ([see code](https://github.com/kisenka/svg-sprite-loader/blob/85f07caed508403ab259b5b13eabc97704e0261b/lib/plugin.js#L165-L179)).

## Reproduction steps

1. `npm install`
2. `npm run build`

## Debugging with VS Code

In the repository a debug configuration "ng build --prod" is included to debug the compilation process with VS Code.
