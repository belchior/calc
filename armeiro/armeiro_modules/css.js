
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');

gulp.task('build:css', function () {
  var concat = require('gulp-concat');
  var cssnano = require('gulp-cssnano');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src(armeiro.css.orig)
  .pipe(concat(armeiro.css.mainFileCompressed))
  .pipe(sourcemaps.init())
  .pipe(cssnano())
  .pipe(sourcemaps.write('map'))
  .pipe(gulp.dest(armeiro.css.dest));
});

gulp.task('compress:css', function () {
  var cssnano = require('gulp-cssnano');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src(armeiro.css.orig)
  .pipe(sourcemaps.init())
  .pipe(cssnano())
  .pipe(sourcemaps.write('map'))
  .pipe(gulp.dest(armeiro.css.dest));
});

gulp.task('concat:css', function () {
  var concat = require('gulp-concat');

  return gulp.src(armeiro.css.orig)
  .pipe(concat(armeiro.css.mainFile))
  .pipe(gulp.dest(armeiro.css.dest));
});

gulp.task('delete:css', function () {
  var deleteFiles = require('./deleteFiles.js');

  deleteFiles({
    orig: armeiro.css.orig,
    dest: armeiro.css.dest,
    extDest: '.css'
  });
  deleteFiles({
    orig: armeiro.css.orig,
    dest: armeiro.css.dest + 'map/',
    extDest: '.css.map'
  });
  deleteFiles({
    orig: armeiro.css.dest + armeiro.css.mainFile,
    dest: armeiro.css.dest,
    extDest: '.css'
  });
  deleteFiles({
    orig: armeiro.css.dest + armeiro.css.mainFileCompressed,
    dest: armeiro.css.dest,
    extDest: '.css'
  });
  deleteFiles({
    orig: armeiro.css.dest + 'map/' + armeiro.css.mainFileCompressed + '.map',
    dest: armeiro.css.dest + 'map/',
    extDest: '.map'
  });
});

gulp.task('watch:css:build', function () {
  return gulp.watch(armeiro.css.orig, ['build:css']);
});

gulp.task('watch:css:compress', function () {
  return gulp.watch(armeiro.css.orig, ['compress:css']);
});

gulp.task('watch:css:concat', function () {
  return gulp.watch(armeiro.css.orig, ['concat:css']);
});
