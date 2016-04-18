// Using: https://github.com/geekflyer/gulp-ui5-preload

var del = require('del');
var zip = require('gulp-zip');
var gulp = require('gulp');
var docco = require("gulp-docco");
var eslint = require('gulp-eslint');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var ui5preload = require('gulp-ui5-preload');
var prettydata = require('gulp-pretty-data');
var runSequence = require('run-sequence');

var projectName = 'Jonas_Sandbox';
var appName = 'compact-table';

var dest = '../../../../mii/' + projectName + '/WEB/'+ appName;
var miiSrc = '../../../../mii-src/' + projectName + '_project';
var zipFile = projectName + '.zip';
var destZip = '../../../../mii';
var doccoDest = '../../../../docco/' + projectName + '/' + appName + '/';
var destResources = '../../../../mii/' + projectName + '/WEB/' + appName + '/resources';
var destResourcesDev = './resources';

gulp.task('zip2', function(callback) {
  runSequence('clean-zip',
              ['copy-mii-src', 'copy-bower-resources'],
              'zip',
              callback);
});

gulp.task('zip', ['copy-mii-src', 'copy-bower-resources'], function () {
  return gulp.src(destZip + '/**/*')
    .pipe(zip(zipFile))
    .pipe(gulp.dest(destZip));
});

gulp.task('eslint', function () {
  return gulp.src(['**/*.js', '!resources/**', '!bower_components/**', 
                   '!node_modules/**', '!test/**', '!Gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on 
    // lint error, return the stream and pipe to failAfterError last. 
    .pipe(eslint.failAfterError());
});

gulp.task('clean-zip', function () {
  return del([destZip], {
    force: true
  });
});

gulp.task('clean', function () {
  return del([dest, destZip, doccoDest], {
    force: true
  });
});

gulp.task('copy-mii-src', function () {
  return gulp.src(miiSrc + '/**/*')
    .pipe(gulp.dest(destZip));
});

gulp.task('copy-resources', function () {
  return gulp.src('../../../../runtime/resources/**/*')
    .pipe(gulp.dest(destResources));
});

gulp.task('copy-bower-resources', function () {
  return gulp.src(['bower_components/openui5-sap.m/resources/**/*', 
                   'bower_components/openui5-sap.ui.core/resources/**/*', 
                   'bower_components/openui5-sap.ui.unified/resources/**/*', 
                   'bower_components/openui5-sap.ui.table/resources/**/*', 
                   'bower_components/openui5-themelib_sap_bluecrystal/resources/**/*', 
                   'bower_components/openui5-sap.ui.layout/resources/**/*'])
    .pipe(gulp.dest(destResources));
});

gulp.task('copy-bower-resources-dev', function () {
  return gulp.src(['bower_components/openui5-sap.m/resources/**/*', 
                   'bower_components/openui5-sap.ui.core/resources/**/*', 
                   'bower_components/openui5-sap.ui.unified/resources/**/*', 
                   'bower_components/openui5-sap.ui.table/resources/**/*', 
                   'bower_components/openui5-themelib_sap_bluecrystal/resources/**/*', 
                   'bower_components/openui5-sap.ui.layout/resources/**/*'])
    .pipe(gulp.dest(destResourcesDev));
});

gulp.task('copy-all-src', function () {
  return gulp.src(['**/*.*', '!bower_components/**/*.*', '!node_modules/**/*.*'])
    .pipe(gulp.dest(dest));
});

gulp.task('copy-html', function () {
  return gulp.src('./*.html')
    .pipe(gulp.dest(dest));
});

gulp.task('copy-i18n', function () {
  return gulp.src('i18n/*.*')
    .pipe(gulp.dest(dest + '/i18n'));
});

gulp.task('copy-manifest', function () {
  return gulp.src('manifest.json')
    .pipe(gulp.dest(dest));
});

gulp.task('copy-localService', function () {
  return gulp.src(['localService/*.*', 'localService/**/*.json'])
    .pipe(gulp.dest(dest + '/localService'));
});

gulp.task('docco', function () {
  gulp.src("./**/*.js")
    .pipe(docco())
    .pipe(gulp.dest(doccoDest))
});

gulp.task('ui5preload', function () {
  return gulp.src(['Component.js', 'controller/*.js', 'model/*.js', 'view/*.xml'])
    .pipe(gulpif('**/*.js', uglify()))
    .pipe(gulpif('**/*.xml', prettydata({
      type: 'minify'
    })))
    .pipe(ui5preload({
      base: './',
      namespace: 'wt'
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('default', ['eslint', 'ui5preload', 'copy-html', 'copy-manifest', 'copy-localService', 'copy-i18n', 'copy-bower-resources-dev', 'docco']);