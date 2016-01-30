
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');

gulp.task('build:coffee', function () {
  var coffee = require('gulp-coffee');
  var concat = require('gulp-concat');
  var sourcemaps = require('gulp-sourcemaps');
  var uglify = require('gulp-uglify');

  return gulp.src(armeiro.coffee.orig)
  .pipe(coffee({bare: true}).on('error', console.log))
  .pipe(concat(armeiro.coffee.mainFileCompressed))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('map'))
  .pipe(gulp.dest(armeiro.coffee.dest));
});

gulp.task('compile:coffee', function () {
  var coffee = require('gulp-coffee');

  return gulp.src(armeiro.coffee.orig)
  .pipe(coffee({bare: true}).on('error', console.log))
  .pipe(gulp.dest(armeiro.coffee.dest));
});

gulp.task('compress:coffee', function () {
  var coffee = require('gulp-coffee');
  var sourcemaps = require('gulp-sourcemaps');
  var uglify = require('gulp-uglify');

  return gulp.src(armeiro.coffee.orig)
  .pipe(coffee({bare: true}).on('error', console.log))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('map'))
  .pipe(gulp.dest(armeiro.coffee.dest));
});

gulp.task('concat:coffee', function () {
  var coffee = require('gulp-coffee');
  var concat = require('gulp-concat');

  return gulp.src(armeiro.coffee.orig)
  .pipe(coffee({bare: true}).on('error', console.log))
  .pipe(concat(armeiro.coffee.mainFile))
  .pipe(gulp.dest(armeiro.coffee.dest));
});

gulp.task('delete:coffee', function () {
  var deleteFiles = require('./deleteFiles.js');

  deleteFiles({
    orig: armeiro.coffee.orig,
    dest: armeiro.coffee.dest,
    extDest: '.js'
  });
  deleteFiles({
    orig: armeiro.coffee.orig,
    dest: armeiro.coffee.dest + 'map/',
    extDest: '.js.map'
  });
  deleteFiles({
    orig: armeiro.coffee.dest + armeiro.coffee.mainFile,
    dest: armeiro.coffee.dest,
    extDest: '.js'
  });
  deleteFiles({
    orig: armeiro.coffee.dest + armeiro.coffee.mainFileCompressed,
    dest: armeiro.coffee.dest,
    extDest: '.js'
  });
  deleteFiles({
    orig: armeiro.coffee.dest + 'map/' + armeiro.coffee.mainFileCompressed + '.map',
    dest: armeiro.coffee.dest + 'map/',
    extDest: '.map'
  });
});

gulp.task('watch:coffee:build', function () {
  return gulp.watch(armeiro.coffee.orig, ['build:coffee']);
});

gulp.task('watch:coffee:compile', function () {
  return gulp.watch(armeiro.coffee.orig, ['compile:coffee']);
});

gulp.task('watch:coffee:compress', function () {
  return gulp.watch(armeiro.coffee.orig, ['compress:coffee']);
});

gulp.task('watch:coffee:concat', function () {
  return gulp.watch(armeiro.coffee.orig, ['concat:coffee']);
});
