
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');

gulp.task('build:js', function () {
  var concat = require('gulp-concat');
  var sourcemaps = require('gulp-sourcemaps');
  var uglify = require('gulp-uglify');

  return gulp.src(armeiro.js.orig)
  .pipe(concat(armeiro.js.mainFileCompressed))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('map'))
  .pipe(gulp.dest(armeiro.js.dest));
});

gulp.task('compress:js', function () {
  var sourcemaps = require('gulp-sourcemaps');
  var uglify = require('gulp-uglify');

  return gulp.src(armeiro.js.orig)
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('map'))
  .pipe(gulp.dest(armeiro.js.dest));
});

gulp.task('concat:js', function () {
  var concat = require('gulp-concat');

  return gulp.src(armeiro.js.orig)
  .pipe(concat(armeiro.js.mainFile))
  .pipe(gulp.dest(armeiro.js.dest));
});

gulp.task('delete:js', function () {
  var deleteFiles = require('./deleteFiles.js');

  deleteFiles({
    orig: armeiro.js.orig,
    dest: armeiro.js.dest,
    extDest: '.js'
  });
  deleteFiles({
    orig: armeiro.js.orig,
    dest: armeiro.js.dest + 'map/',
    extDest: '.js.map'
  });
  deleteFiles({
    orig: armeiro.js.dest + armeiro.js.mainFile,
    dest: armeiro.js.dest,
    extDest: '.js'
  });
  deleteFiles({
    orig: armeiro.js.dest + armeiro.js.mainFileCompressed,
    dest: armeiro.js.dest,
    extDest: '.js'
  });
  deleteFiles({
    orig: armeiro.js.dest + 'map/' + armeiro.js.mainFileCompressed + '.map',
    dest: armeiro.js.dest + 'map/',
    extDest: '.map'
  });
});

gulp.task('watch:js:build', function () {
  return gulp.watch(armeiro.js.orig, ['build:js']);
});

gulp.task('watch:js:compress', function () {
  return gulp.watch(armeiro.js.orig, ['compress:js']);
});

gulp.task('watch:js:concat', function () {
  return gulp.watch(armeiro.js.orig, ['concat:js']);
});
