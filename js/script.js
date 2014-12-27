
function isIE(version, comparison) {
  var cc = 'IE';
  var b = document.createElement('B');
  var docElem = document.documentElement;
  var ie;

  if (version) {
    cc += ' ' + version;
    if (comparison) { cc = comparison + ' ' + cc; }
  }

  b.innerHTML = '<!--[if ' + cc + ']><b id="iecctest"></b><![endif]-->';
  docElem.appendChild(b);
  ie = !!document.getElementById('iecctest');
  docElem.removeChild(b);
  return ie;
}

if (isIE()) {
  document.createElement('output');
}

window.onload = function () {
  'use strict';

  var term = new Terminal();
  term.skin('.calc-terminal');

  var macwidget = new Macwidget();
  macwidget.skin('.calc-macwidget');
};
