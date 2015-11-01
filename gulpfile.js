'use strict';

var armeiro = require('./armeiro');
var gulp = require('gulp');

gulp.task('build', ['compile:less', 'compress:css', 'concat:js', 'compress:js', 'compress:svg', 'compress:images']);
gulp.task('livereload', ['connect', 'watch:less', 'watch:js', 'watch:build']);
gulp.task('default', ['doc:help']);
