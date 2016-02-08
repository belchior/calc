
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');

gulp.task('copy', function () {
  var cp = require('cp');
  var glob = require('glob');
  var gutil = require('gulp-util');
  var fs = require('fs');
  var path = require('path');

  if (!Array.isArray(armeiro.copy)) {
    gutil.log(gutil.colors.red('Armeiro: O atributo copy precisa ser um array'));
    gutil.log(
      gutil.colors.red('Armeiro: Consulte a documentação em:'),
      gutil.colors.underline('https://github.com/belchior/armeiro')
    );
    return false;
  }

  return armeiro.copy.forEach(loadOriginFile);

  function loadOriginFile(item) {
    glob(item.orig, null, function (err, files) {
      if (err) {
        console.error(err);
        return false;
      }
      files.forEach(function (orig) {
        copyFile(orig, item.dest);
      });
    });
  }

  function copyFile(orig, dest) {
    fs.stat(dest, function (err, stat) {
      if (err) {
        cp(orig, dest, function (err) {
          if (err) {
            console.error(err);
          }
        });
        return false;
      }
      if (stat.isDirectory()) {
        dest += path.basename(orig);
      }
      cp.sync(orig, dest);
    });
  }

});
