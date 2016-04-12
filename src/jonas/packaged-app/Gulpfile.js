// Using: https://github.com/geekflyer/gulp-ui5-preload

var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var ui5preload = require('gulp-ui5-preload');
var prettydata = require('gulp-pretty-data');


var dest = 'dist';

gulp.task('clean', function () {
  return del([dest]);
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

gulp.task('ui5preload', function(){
  return gulp.src(['Component.js', 'controller/*.js', 'model/*.js', 'localService/*.js', 'view/*.xml', 'i18n/*.*'])
          .pipe(gulpif('**/*.js', uglify()))
          .pipe(gulpif('**/*.xml', prettydata({type:'minify'}))) 
          .pipe(ui5preload({base:'./', namespace:'myCompany.myApp'}))
          .pipe(gulp.dest(dest));
     })

gulp.task('default', ['ui5preload', 'copy-html', 'copy-manifest', 'copy-localService']);

