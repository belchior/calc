
module.exports = deleteFiles;

function deleteFiles(obj) {
  var del = require('del');
  var glob = require('glob');
  var gutil = require('gulp-util');
  var path = require('path');

  obj.extDest = obj.extDest || '';
  var options = {};
  var cb = function (err, files) {
    if (err) {
      return gutil.log(gutil.colors.red('Armeiro: Arquivos não encontrados\n' + err));
    }
    files = files.map(function (file) {
      return obj.dest + path.basename(file, path.extname(file)) + obj.extDest;
    });
    del(files);
  };

  if (typeof obj.orig === 'string') {
    glob(obj.orig, options, cb);

  } else if (Array.isArray(obj.orig) && obj.orig.length > 0) {
    obj.orig.forEach(function (pattern) {
      glob(pattern, options, cb);
    });
  }
}
