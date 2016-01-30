
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');

gulp.task('delete:sprite', function () {
  var del = require('del');

  del([
    armeiro.sprite.dest + armeiro.sprite.name,
    armeiro.sprite.dest + armeiro.sprite.cssName
  ]);
});

gulp.task('build:sprite', function () {
  var spritesmith = require('gulp.spritesmith');

  var spriteData = gulp.src(armeiro.sprite.orig)
  .pipe(spritesmith({
    algorithm: 'top-down',
    imgName: armeiro.sprite.imgName,
    imgPath: armeiro.sprite.imgPath,
    cssName: armeiro.sprite.cssName
  }));
  return spriteData.pipe(gulp.dest(armeiro.sprite.dest));
});
