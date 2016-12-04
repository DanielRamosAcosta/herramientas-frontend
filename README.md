# Herramientas de front-end

Este repositorio es un ejemplo de cómo juntar distintas herramientas usadas para la programación web de front-end, basado en la [presentación](https://manzdev.github.io/frontend-el-lado-oscuro) de [@ManzDev](https://github.com/ManzDev). Se trata de una implementación cercana al ecosistema Gulp de [esta](https://manzdev.github.io/frontend-el-lado-oscuro/#/gulpjs-ecosystem) diapositiva.

## Preprocesado

La tarea de Gulp `build` realiza distintas transformaciones a nuestro código. A continuación se enumeran los plugins que se usan.

### HTML

* [`gulp-pug`](https://www.npmjs.com/package/gulp-pug): Convierte [pug.js](https://github.com/pugjs/pug) a HTML.
* [`gulp-ga`](https://www.npmjs.com/package/gulp-ga): Añade el código de Google Analitycs al fichero HTML.
* [`gulp-htmlmin`](https://www.npmjs.com/package/gulp-htmlmin): Minifica los ficheros.

### CSS
* [`gulp-less`](https://www.npmjs.com/package/gulp-less): Convierte [less](http://lesscss.org/) a CSS.
* [`gulp-postcss`](https://www.npmjs.com/package/gulp-postcss): Procesa CSS mediante varios plugins.
* [`autoprefixer`](https://www.npmjs.com/package/autoprefixer): Plugin para PostCSS que añade los profejios de los navegadores.
* [`cssnano`](https://www.npmjs.com/package/cssnano): Plugin para PostCSS que realiza distintas optimizaciones a nuestro código.
* [`postcss-csscomb`](https://www.npmjs.com/package/postcss-csscomb): Plugin para PostCSS que formatea el estilo de código.
* [`gulp-cleancss`](https://www.npmjs.com/package/gulp-cleancss): Minifica los ficheros.

### JavaScript
* [`gulp-webpack`](https://www.npmjs.com/package/gulp-webpack): Llama a [Webpack](https://webpack.github.io/) desde el gulpfile.
  * Webpack nos permite requerir módulos de npm que luego se incluirán en el fichero final.
  * [`babel-loader`](https://github.com/babel/babel-loader): Plugin para Webpack que usa babel para transpilar nuestro código a ES5.

### Imágenes

* [`gulp-image`](https://www.npmjs.com/package/gulp-image): Transforma nuestras imágenes para que ocupen menos espacio.

## Otras tareas

* `clean`: Elimina el directorio `dist`
* `lint`: Pasa el lint a los scripts y las hojas de estilo, usando [`standard`](https://github.com/feross/standard) y [`lesshint`](https://github.com/lesshint/lesshint) respectivamente.
* `serve`: Abre un servidor usando [`browser-sync`](https://www.browsersync.io/) para la actualización automática del navegador cuando se guarden los ficheros.
* `deploy`: Despliega el contenido del directorio `dist` en las [Github Pages](https://pages.github.com/)
* `all`: Limpia el repo, construye la página y la despliega en Github Pages.

## Nota
Se usa Gulp 4, por lo que se recomienda usarlo a través de las tareas `npm start` y `npm run build` para no tener que instalarlo de forma global.
