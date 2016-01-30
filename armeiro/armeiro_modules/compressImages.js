
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');

gulp.task('compress:images', function () {
  var imagemin = require('gulp-imagemin');
  var imageminOptipng = require('imagemin-optipng');

  return gulp.src(armeiro.compressImages.orig)
  .pipe(imagemin({
    verbose: true,
    progressive: true,
    use: [imageminOptipng({optimizationLevel: 3})],
  }))
  .pipe(gulp.dest(armeiro.compressImages.dest));
});

gulp.task('delete:images', function () {
  var deleteFiles = require('./deleteFiles.js');

  deleteFiles({
    orig: armeiro.compressImages.orig,
    dest: armeiro.compressImages.dest,
    extDest: '.gif'
  });
  deleteFiles({
    orig: armeiro.compressImages.orig,
    dest: armeiro.compressImages.dest,
    extDest: '.jpeg'
  });
  deleteFiles({
    orig: armeiro.compressImages.orig,
    dest: armeiro.compressImages.dest,
    extDest: '.jpg'
  });
  deleteFiles({
    orig: armeiro.compressImages.orig,
    dest: armeiro.compressImages.dest,
    extDest: '.png'
  });
});

gulp.task('watch:images', function () {
  return gulp.watch(armeiro.compressImages.orig, ['compress:images']);
});
