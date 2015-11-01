'use strict';

var armeiro = require('./armeiro');
var gulp = require('gulp');

gulp.task('livereload', ['connect', 'watch:less', 'watch:js', 'watch:build']);
gulp.task('default', ['doc:help']);
