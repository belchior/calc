
var armeiro = require('./armeirorc.js');
var gulp = require('gulp');

gulp.task('doc:help', function () {
  var doc = '\n\
  # documentation\n\
  gulp doc\n\
  \n\
  # browser-sync\n\
  gulp browsersync:proxy\n\
  gulp browsersync:server\n\
  \n\
  # build\n\
  gulp build:coffee\n\
  gulp build:css\n\
  gulp build:js\n\
  gulp build:less\n\
  gulp build:sass\n\
  gulp build:sprite\n\
  \n\
  # compile\n\
  gulp compile:coffee\n\
  gulp compile:less\n\
  gulp compile: sass\n\
  \n\
  # compress\n\
  gulp compress:coffee\n\
  gulp compress:images\n\
  gulp compress:svg\n\
  gulp compress:css\n\
  gulp compress:js\n\
  gulp compress:less\n\
  gulp compress:sass\n\
  \n\
  # concat\n\
  gulp concat:coffee\n\
  gulp concat:css\n\
  gulp concat:js\n\
  gulp concat:less\n\
  gulp concat:sass\n\
  \n\
  # delete\n\
  gulp delete:coffee\n\
  gulp delete:images\n\
  gulp delete:svg\n\
  gulp delete:css\n\
  gulp delete:js\n\
  gulp delete:less\n\
  gulp delete:sass\n\
  gulp delete:sprite\n\
  \n\
  # watch\n\
  gulp watch:coffee:build\n\
  gulp watch:coffee:compile\n\
  gulp watch:coffee:compress\n\
  gulp watch:coffee:concat\n\
  gulp watch:css:build\n\
  gulp watch:css:compress\n\
  gulp watch:css:concat\n\
  gulp watch:images\n\
  gulp watch:js:build\n\
  gulp watch:js:compress\n\
  gulp watch:js:concat\n\
  gulp watch:less:build\n\
  gulp watch:less:compile\n\
  gulp watch:less:compress\n\
  gulp watch:less:concat\n\
  gulp watch:sass:build\n\
  gulp watch:sass:compile\n\
  gulp watch:sass:compress\n\
  gulp watch:sass:concat\n\
  gulp watch:svg\n\
  ';

  console.log(doc);
});

gulp.task('doc', ['doc:help']);
