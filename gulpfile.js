/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var autoprefixer  = require('gulp-autoprefixer');
var server = require('gulp-server-livereload');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
//wrench.readdirSyncRecursive('./gulp').filter(function (file) {
//  return (/\.(js|coffee)$/i).test(file);
//}).map(function (file) {
//  require('./gulp/' + file);
//});


/*
 Scripts Task
 ugligy
 */

gulp.task('scripts', function () {
  //gulp.src('app/**/*.js')
  //  .pipe(plumber())
  //  .pipe(uglify())
  //  .pipe(gulp.dest('build/scripts'));
});


//styles
gulp.task('styles', function () {
  //gulp.src('app/styles/**/*.scss')
  //  .pipe(plumber())
  //  .pipe(sass.sync().on('error', sass.logError))
  //  .pipe(sass({
  //      //outputStyle: 'compressed'
  //      outputStyle: 'expanded'
  //    }
  //  ))
  //  .pipe(autoprefixer())//auto prefix the css
  //  .pipe(gulp.dest('app/styles/main'));
});

//compress image
gulp.task('image',function(){
  gulp.src('app/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['scripts','styles','webserver','watch'], function () {
  // gulp.start('build');
});

//Watch JS
gulp.task('watch', function () {
  //gulp.watch('app/**/*.js', ['scripts']);
  //gulp.watch('app/**/*.scss', ['styles']);
});

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(server({
      defaultFile: 'index.html',
      livereload: true,
      //directoryListing: true,
      open: true
    }));
});
