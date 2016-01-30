
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');
var gutil = require('gulp-util');
var errorHandler = function (err) {
  gutil.log(gutil.colors.red('ERROR', 'compile:less'), err);
  this.emit('end', new gutil.PluginError('compile:less', err, { showStack: false }));
};

gulp.task('build:less', function () {
  var concat = require('gulp-concat');
  var less = require('gulp-less');
  var cssnano = require('gulp-cssnano');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src(armeiro.less.orig)
  .pipe(less().on('error', errorHandler))
  .pipe(concat(armeiro.less.mainFileCompressed))
  .pipe(sourcemaps.init())
  .pipe(cssnano())
  .pipe(sourcemaps.write('map'))
  .pipe(gulp.dest(armeiro.less.dest));
});

gulp.task('compile:less', function () {
  var less = require('gulp-less');

  return gulp.src(armeiro.less.orig)
  .pipe(less().on('error', errorHandler))
  .pipe(gulp.dest(armeiro.less.dest));
});

gulp.task('compress:less', function () {
  var less = require('gulp-less');
  var cssnano = require('gulp-cssnano');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src(armeiro.less.orig)
  .pipe(less().on('error', errorHandler))
  .pipe(sourcemaps.init())
  .pipe(cssnano())
  .pipe(sourcemaps.write('map'))
  .pipe(gulp.dest(armeiro.less.dest));
});

gulp.task('concat:less', function () {
  var concat = require('gulp-concat');
  var less = require('gulp-less');

  return gulp.src(armeiro.less.orig)
  .pipe(less().on('error', errorHandler))
  .pipe(concat(armeiro.less.mainFile))
  .pipe(gulp.dest(armeiro.less.dest));
});

gulp.task('delete:less', function () {
  var deleteFiles = require('./deleteFiles.js');

  deleteFiles({
    orig: armeiro.less.orig,
    dest: armeiro.less.dest,
    extDest: '.css'
  });
  deleteFiles({
    orig: armeiro.less.orig,
    dest: armeiro.less.dest + 'map/',
    extDest: '.css.map'
  });
  deleteFiles({
    orig: armeiro.less.dest + armeiro.less.mainFile,
    dest: armeiro.less.dest,
    extDest: '.css'
  });
  deleteFiles({
    orig: armeiro.less.dest + armeiro.less.mainFileCompressed,
    dest: armeiro.less.dest,
    extDest: '.css'
  });
  deleteFiles({
    orig: armeiro.less.dest + 'map/' + armeiro.less.mainFileCompressed + '.map',
    dest: armeiro.less.dest + 'map/',
    extDest: '.map'
  });
});

gulp.task('watch:less:build', function () {
  return gulp.watch(armeiro.less.orig, ['build:less']);
});

gulp.task('watch:less:compile', function () {
  return gulp.watch(armeiro.less.orig, ['compile:less']);
});

gulp.task('watch:less:compress', function () {
  return gulp.watch(armeiro.less.orig, ['compress:less']);
});

gulp.task('watch:less:concat', function () {
  return gulp.watch(armeiro.less.orig, ['concat:less']);
});
