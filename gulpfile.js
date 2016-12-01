const { src, dest, watch, series, parallel } = require('gulp')

// HTML
const pug = require('gulp-pug')
const ga = require('gulp-ga')
const htmlmin = require('gulp-htmlmin')

// CSS
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const csscomb = require('postcss-csscomb')
const cleancss = require('gulp-cleancss')

// Javascript
const webpack = require('gulp-webpack')

// Imágenes
const image = require('gulp-image')

// Otras utilidades
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()
const ghPages = require('gulp-gh-pages')
const del = require('del')
const newer = require('gulp-newer')

// Linters
const standard = require('gulp-standard')
const lesshint = require('gulp-lesshint')

const html = () => src(['src/views/*.pug', '!src/views/template.pug'])
                   .pipe(newer('dist/index.html'))
                   .pipe(pug())
                   .pipe(ga({url: 'mydomain.com', uid: 'UA-12345678-1'}))
                   .pipe(htmlmin({collapseWhitespace: true}))
                   .pipe(dest('dist'))

const css = () => src('src/styles/*.less')
                  .pipe(newer('dist/styles.min.css'))
                  .pipe(less())
                  .pipe(postcss([
                    autoprefixer({browsers: ['last 1 version']}),
                    cssnano(),
                    csscomb('zen')
                  ]))
                  .pipe(cleancss({keepBreaks: false}))
                  .pipe(rename('styles.min.css'))
                  .pipe(dest('dist'))

const js = () => src('src/scripts/index.js')
                 .pipe(webpack(require('./webpack.config.js')))
                 .pipe(rename('main.min.js'))
                 .pipe(dest('dist'))

const img = () => src('src/images/**/*')
                  .pipe(newer('dist/images'))
                  .pipe(image())
                  .pipe(dest('dist/images'))

const clean = () => del('dist/*')

const jslint = () => src(['src/scripts/*.js', './*.js'])
                     .pipe(standard())
                     .pipe(standard.reporter('default', {
                       breakOnError: true,
                       quiet: true
                     }))

const lesslint = () => src('src/styles/*.less')
                       .pipe(lesshint())
                       .pipe(lesshint.reporter())

const lint = series(jslint, lesslint)

const build = parallel(html, css, js, img)

const serve = () => {
  browserSync.init({server: './dist'})

  watch('src/views/*.pug', html)
  watch('src/styles/*.less', css)
  watch('src/scripts/*.js', js)
  watch('src/images/*.(jpg|png|svg)', img)
  watch('dist/*').on('change', browserSync.reload)
}

const deploy = () => src('dist/**/*').pipe(ghPages())

const all = series(clean, build, deploy)

module.exports = {
  default: build,
  clean,
  lint,
  build,
  serve: series(build, serve),
  deploy,
  all
}
