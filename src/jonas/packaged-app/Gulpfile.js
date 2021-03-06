// Using: https://github.com/geekflyer/gulp-ui5-preload

var del = require('del');
var gulp = require('gulp');
var docco = require("gulp-docco");
var eslint = require('gulp-eslint');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var ui5preload = require('gulp-ui5-preload');
var prettydata = require('gulp-pretty-data');

 
var dest = 'dist';
 
gulp.task('eslint', function () {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});
 
gulp.task('lint', function() {
  return gulp.src(['Component.js', './controller/*.js', 'localService/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
  return del([dest], 'docco');
});

gulp.task('copy-html', function() {
  return gulp.src('main/index.html')
    .pipe(gulp.dest(dest));
});

gulp.task('copy-manifest', function() {
  return gulp.src('manifest.json')
    .pipe(gulp.dest(dest));
});

gulp.task('copy-localService', function() {
  return gulp.src(['localService/*.*', 'localService/**/*.json'])
    .pipe(gulp.dest(dest + '/localService'));
});

gulp.task('docco', function() {
  gulp.src("./**/*.js")
    .pipe(docco())
    .pipe(gulp.dest('./docco'))
});

gulp.task('ui5preload', function(){
  return gulp.src(['Component.js', 'controller/*.js', 'model/*.js', 'localService/*.js', 'view/*.xml', 'i18n/*.*'])
          .pipe(gulpif('**/*.js', uglify()))
          .pipe(gulpif('**/*.xml', prettydata({type:'minify'}))) 
          .pipe(ui5preload({base:'./', namespace:'myCompany.myApp'}))
          .pipe(gulp.dest(dest));
     })

gulp.task('default', ['eslint', 'ui5preload', 'copy-html', 'copy-manifest', 'copy-localService', 'docco']);

