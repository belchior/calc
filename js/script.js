
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
  ie = document.getElementById('iecctest') ? true : false;
  docElem.removeChild(b);
  return ie;
}

if (isIE()) {
  document.createElement('output');
}

window.onload = function () {
  'use strict';

  window.sidebar = (function () {
    var elem = document.querySelector('.sidebar');
    var modes = ['normal', 'compact', 'compact-active', 'mobile', 'mobile-active'];

    var hamburgerMenu = elem.querySelector('.hamburger-menu');
    var hamburgerMenuEvent = function () {
      if (sidebar.mode() === 'mobile') { return sidebar.setMode('mobile-active'); }
      if (sidebar.mode() === 'compact') { return sidebar.setMode('compact-active'); }
      return sidebar.setMode('normal');
    };
    hamburgerMenu.addEventListener('click', hamburgerMenuEvent);

    var menuItems = elem.querySelectorAll('.main-menu .item');
    var menuItemsEvent = function () {
      var section;
      [].forEach.call(menuItems, function (item) {
        section = document.querySelector(item.getAttribute('href'));
        section.className = section.className.replace(/\s*active/g, '');
      });
      section = document.querySelector(this.getAttribute('href'));
      section.className = section.className.replace(/\s*active/g, '') + ' active';
      sidebar.setMode('normal');
    };
    [].forEach.call(menuItems, function (item) {
      item.addEventListener('click', menuItemsEvent);
    });

    var mode = function () {
      var className = document.body.className.split(/\s+/);
      var base = parseInt(getComputedStyle(document.body)['font-size']) || 1;
      var width = parseInt(getComputedStyle(elem).width);
      var height = parseInt(getComputedStyle(elem).height);

      // filter classes that are not Menu Mode and then return the last
      className = className.filter(function (cName) {
        return modes.indexOf(cName) !== -1;
      }).pop();
      if (className && className !== 'normal') {return className;}

      // will determine dynamically what is the Mode of Menu
      if (width > height) {return 'mobile';}
      if (window.innerWidth > 550 && window.innerWidth <= 790) {return 'compact';}
      if (window.innerWidth > 780) {return 'normal';}

      return '';
    };

    var setMode = function (mode) {
      var className = document.body.className.split(/\s+/);
      if (modes.indexOf(mode) < 0) {
        return;
      }
      className = className.filter(function (cName) {
        return modes.indexOf(cName) === -1;
      });
      document.body.className = className.join(' ') + ' ' + mode;
    };

    return {
      mode: mode,
      setMode: setMode
    };
  })();

  if (window.location.hash) {
    document.querySelector('.item[href="' + window.location.hash + '"]').click();
  }

  var i;
  var elem;
  var tabindex = [
    '.hamburger-menu',
    '.item-terminal',
    '.item-macwidget',
    '.item-custom',
    '.github-profile',
    '.github-project',
    '.calc-custom .display',
    '.calc-custom [data-name="number1"]',
    '.calc-custom [data-name="number2"]',
    '.calc-custom [data-name="number3"]',
    '.calc-custom [data-name="number4"]',
    '.calc-custom [data-name="number5"]',
    '.calc-custom [data-name="number6"]',
    '.calc-custom [data-name="number7"]',
    '.calc-custom [data-name="number8"]',
    '.calc-custom [data-name="number9"]',
    '.calc-custom [data-name="number0"]',
    '.calc-custom [data-name="dot"]',
    '.calc-custom [data-name="equality"]',
    '.calc-custom [data-name="addition"]',
    '.calc-custom [data-name="subtraction"]',
    '.calc-custom [data-name="multiplication"]',
    '.calc-custom [data-name="division"]',
    '.calc-custom [data-name="parenthesisOpen"]',
    '.calc-custom [data-name="parenthesisClose"]',
    '.calc-custom [data-name="delete"]',
    '.calc-custom [data-name="clear"]',
    '.calc-custom [data-name="madd"]',
    '.calc-custom [data-name="msubtract"]',
    '.calc-custom [data-name="mrecall"]',
    '.calc-custom [data-name="mclear"]',
    '.calc-custom [data-name="percent"]',
    '.calc-custom [data-name="sin"]',
    '.calc-custom [data-name="cos"]',
    '.calc-custom [data-name="tan"]',
    '.calc-terminal .input',
    '.calc-terminal [data-name="number1"]',
    '.calc-terminal [data-name="number2"]',
    '.calc-terminal [data-name="number3"]',
    '.calc-terminal [data-name="number4"]',
    '.calc-terminal [data-name="number5"]',
    '.calc-terminal [data-name="number6"]',
    '.calc-terminal [data-name="number7"]',
    '.calc-terminal [data-name="number8"]',
    '.calc-terminal [data-name="number9"]',
    '.calc-terminal [data-name="number0"]',
    '.calc-terminal [data-name="dot"]',
    '.calc-terminal [data-name="parenthesisOpen"]',
    '.calc-terminal [data-name="parenthesisClose"]',
    '.calc-terminal [data-name="equality"]',
    '.calc-terminal [data-name="addition"]',
    '.calc-terminal [data-name="subtraction"]',
    '.calc-terminal [data-name="multiplication"]',
    '.calc-terminal [data-name="division"]',
    '.calc-terminal [data-name="clear"]',
    '.calc-terminal [data-name="backspace"]',
    '.calc-macwidget .display',
    '.calc-macwidget [data-name="number1"]',
    '.calc-macwidget [data-name="number2"]',
    '.calc-macwidget [data-name="number3"]',
    '.calc-macwidget [data-name="number4"]',
    '.calc-macwidget [data-name="number5"]',
    '.calc-macwidget [data-name="number6"]',
    '.calc-macwidget [data-name="number7"]',
    '.calc-macwidget [data-name="number8"]',
    '.calc-macwidget [data-name="number9"]',
    '.calc-macwidget [data-name="number0"]',
    '.calc-macwidget [data-name="dot"]',
    '.calc-macwidget [data-name="equality"]',
    '.calc-macwidget [data-name="addition"]',
    '.calc-macwidget [data-name="subtraction"]',
    '.calc-macwidget [data-name="multiplication"]',
    '.calc-macwidget [data-name="division"]',
    '.calc-macwidget [data-name="madd"]',
    '.calc-macwidget [data-name="msubtract"]',
    '.calc-macwidget [data-name="mclear"]',
    '.calc-macwidget [data-name="mrecall"]',
    '.calc-macwidget [data-name="clear"]'
  ];
  for (i = 1; i <= tabindex.length; i += 1) {
    elem = document.querySelector(tabindex[i - 1]);
    if (elem) { elem.setAttribute('tabindex', i); }
  }

  var custom = new Custom('.calc-custom');
  var term = new Terminal('.calc-terminal');
  var macwidget = new Macwidget('.calc-macwidget');
};
