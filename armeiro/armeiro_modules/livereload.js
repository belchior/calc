
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');

gulp.task('connect', function () {
  var connect = require('gulp-connect');

  connect.server({
    port: 3000,
    root: 'build',
    livereload: true
  });
});

gulp.task('files', function () {
  var connect = require('gulp-connect');

  gulp.src(armeiro.livereload.orig)
  .pipe(connect.reload());
});

gulp.task('watch:files', function () {
  gulp.watch(armeiro.livereload.orig, ['files']);
});

gulp.task('livereload', ['connect', 'watch:files']);
