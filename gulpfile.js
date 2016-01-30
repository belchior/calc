'use strict';

var Armeiro = require('./armeiro');
var armeiro = require('./armeiro/armeiro_modules/armeirorc.js');
var gulp = require('gulp');

gulp.task('watch:less:build', function () {
  return gulp.watch(armeiro.less.watch, ['build:less']);
});

gulp.task('default', ['browsersync:server', 'watch:less:build', 'watch:js:build']);
