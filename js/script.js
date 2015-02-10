
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

  var sidebar = (function () {
    var i;
    var hide = 0;
    var scroll = 0;
    var elem = document.querySelector('.sidebar');
    var hamburgerMenu = elem.querySelector('.hamburger-menu');
    var menuItems = elem.querySelectorAll('.main-menu .item');

    var hamburgerMenuEvent = function () {
      if (sidebar.mode() === 'mobile') { return sidebar.setMode('mobile-active'); }
      if (sidebar.mode() === 'compact') { return sidebar.setMode('compact-active'); }
      return sidebar.setMode('normal');
    };

    var menuItemsEvent = function () {
      var i;
      var section;

      for (i = 0; i < menuItems.length; i += 1) {
        section = document.querySelector(menuItems[i].getAttribute('href'));
        section.style.display = 'none';
      }
      section = document.querySelector(this.getAttribute('href'));
      section.style.display = 'block';

      window.location.hash = this.getAttribute('href');
      sidebar.setMode('normal');
    };

    var mode = function () {
      var base = parseInt(getComputedStyle(document.body)['font-size']) || 1;
      var width = parseInt(getComputedStyle(elem).width);
      var height = parseInt(getComputedStyle(elem).height);

      if (width > height) {return 'mobile';}
      if (
        window.innerWidth > 560 &&
        window.innerWidth <= 780 &&
        document.body.getAttribute('class').search('compact-active') < 0
      ) {
        return 'compact';
      }
      if (window.innerWidth > 780) {return 'normal';}

      return '';
    };

    var setMode = function (mode) {
      var attr = document.body.getAttribute('class') || '';
      attr = attr.split(' ');

      if (['compact', 'compact-active', 'mobile', 'mobile-active'].indexOf(mode)) {
        attr.splice(attr.indexOf(mode), 1);
        attr.push(mode);

      } else {
        attr.splice(attr.indexOf('compact'), 1);
        attr.splice(attr.indexOf('compact-active'), 1);
        attr.splice(attr.indexOf('mobile'), 1);
        attr.splice(attr.indexOf('mobile-active'), 1);
      }

      document.body.setAttribute('class', attr.join(' '));
    };

    var position = 0;
    var bar = document.querySelector('.sidebar');
    var scrollEvent = function () {
      if (sidebar.mode() === 'mobile') {
        if (document.body.scrollTop > position && position > 0) {
          bar.style.display = 'none';
        } else {
          bar.style.display = 'block';
        }
        position = document.body.scrollTop;
      }
    };

    for (i = 0; i < menuItems.length; i += 1) {
      menuItems[i].addEventListener('click', menuItemsEvent, false);
    }
    hamburgerMenu.addEventListener('click', hamburgerMenuEvent, false);
    window.addEventListener('scroll', scrollEvent, false);

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
};

var custom = new Custom('.calc-custom');
var term = new Terminal('.calc-terminal');
var macwidget = new Macwidget('.calc-macwidget');
