
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');

gulp.task('compress:svg', function () {
  var imageminSvgo = require('imagemin-svgo');

  return gulp.src(armeiro.compressSVG.orig)
  .pipe(imageminSvgo()())
  .pipe(gulp.dest(armeiro.compressSVG.dest));
});

gulp.task('delete:svg', function () {
  var deleteFiles = require('./deleteFiles.js');

  deleteFiles({
    orig: armeiro.compressSVG.orig,
    dest: armeiro.compressSVG.dest,
    extDest: '.svg'
  });
});

gulp.task('watch:svg', function () {
  return gulp.watch(armeiro.compressSVG.orig, ['compress:svg']);
});
