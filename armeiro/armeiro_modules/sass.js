
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');

gulp.task('build:sass', function () {
  var concat = require('gulp-concat');
  var cssnano = require('gulp-cssnano');
  var sass = require('gulp-sass');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src(armeiro.sass.orig)
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(concat(armeiro.sass.mainFileCompressed))
  .pipe(sourcemaps.init())
  .pipe(cssnano())
  .pipe(sourcemaps.write('map'))
  .pipe(gulp.dest(armeiro.sass.dest));
});

gulp.task('compile:sass', function () {
  var concat = require('gulp-concat');
  var cssnano = require('gulp-cssnano');
  var sass = require('gulp-sass');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src(armeiro.sass.orig)
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulp.dest(armeiro.sass.dest));
});

gulp.task('compress:sass', function () {
  var cssnano = require('gulp-cssnano');
  var sass = require('gulp-sass');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src(armeiro.sass.orig)
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(sourcemaps.init())
  .pipe(cssnano())
  .pipe(sourcemaps.write('map'))
  .pipe(gulp.dest(armeiro.sass.dest));
});

gulp.task('concat:sass', function () {
  var concat = require('gulp-concat');
  var sass = require('gulp-sass');

  return gulp.src(armeiro.sass.orig)
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(concat(armeiro.sass.mainFile))
  .pipe(gulp.dest(armeiro.sass.dest));
});

gulp.task('delete:sass', function () {
  var deleteFiles = require('./deleteFiles.js');

  deleteFiles({
    orig: armeiro.sass.orig,
    dest: armeiro.sass.dest,
    extDest: '.css'
  });
  deleteFiles({
    orig: armeiro.sass.orig,
    dest: armeiro.sass.dest + 'map/',
    extDest: '.css.map'
  });
  deleteFiles({
    orig: armeiro.sass.dest + armeiro.sass.mainFile,
    dest: armeiro.sass.dest,
    extDest: '.css'
  });
  deleteFiles({
    orig: armeiro.sass.dest + armeiro.sass.mainFileCompressed,
    dest: armeiro.sass.dest,
    extDest: '.css'
  });
  deleteFiles({
    orig: armeiro.sass.dest + 'map/' + armeiro.sass.mainFileCompressed + '.map',
    dest: armeiro.sass.dest + 'map/',
    extDest: '.map'
  });
});

gulp.task('watch:sass:build', function () {
  return gulp.watch(armeiro.sass.orig, ['build:sass']);
});

gulp.task('watch:sass:compile', function () {
  return gulp.watch(armeiro.sass.orig, ['compile:sass']);
});

gulp.task('watch:sass:compress', function () {
  return gulp.watch(armeiro.sass.orig, ['compress:sass']);
});

gulp.task('watch:sass:concat', function () {
  return gulp.watch(armeiro.sass.orig, ['concat:sass']);
});
