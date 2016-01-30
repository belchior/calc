
var armeiro;
var gutil = require('gulp-util');
var path = require('path');
var root = path.resolve(__dirname, '../../');

try {
  root = root + '/';
  armeiro = require(root + 'package.json').armeiro;
  if (!armeiro) {
    throw new Error();
  }
  armeiro.root = root;
  module.exports = armeiro;

} catch (e) {
  gutil.log(gutil.colors.red('Armeiro: Não foi possível encontrar as configurações do projeto'));
  gutil.log(
    gutil.colors.red('Armeiro: Consulte a documentação em:'),
    gutil.colors.underline('https://github.com/belchior/armeiro')
  );
}
