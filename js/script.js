
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
      return ['mobile', 'compact'].indexOf(sidebar.mode()) >= 0 ?
        sidebar.setMode('mobile-active') :
        sidebar.setMode('normal');
    };

    var menuItemsEvent = function () {
      var attrClass;
      for (i = 0; i < menuItems.length; i += 1) {
        attrClass = menuItems[i].getAttribute('class').replace(' active', '');
        menuItems[i].setAttribute('class', attrClass);
      }
      attrClass = this.getAttribute('class');
      this.setAttribute('class', attrClass + ' active');
      sidebar.setMode('normal');
    };

    var mode = function () {
      var width = parseInt(getComputedStyle(elem).width);
      var height = parseInt(getComputedStyle(elem).height);

      if (width === 290 && height > 64) {
        return 'normal';
      }
      if (width === 64 && height > 64) {
        return 'compact';
      }
      if (width > 64 && height === 64) {
        return 'mobile';
      }
      return '';
    };

    var setMode = function (mode) {
      if (mode === 'compact') {
        elem.style.width = '4em';
        elem.style.height = '100%';
        elem.querySelector('.hamburger-menu').style.display = 'none';
        elem.querySelector('.main-menu').style.marginTop = '4em';
        document.querySelector('.main').style.marginLeft = '4em';

      } else if (mode === 'mobile') {
        elem.style.width = '100%';
        elem.style.height = '4em';
        elem.querySelector('.hamburger-menu').style.display = 'block';
        document.querySelector('.main').style.marginLeft = '0';

      } else if (mode === 'mobile-active') {
        elem.style.width = '18.125em';
        elem.style.height = '100%';
        elem.querySelector('.hamburger-menu').style.display = 'block';
        elem.querySelector('.main-menu').style.marginTop = '0';
        document.querySelector('.main').style.marginLeft = '0';

      } else {
        elem.style.width = '';
        elem.style.height = '';
        elem.querySelector('.hamburger-menu').style.display = '';
        elem.querySelector('.main-menu').style.marginTop = '';
        document.querySelector('.main').style.marginLeft = '';
      }
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

  var term = new Terminal();
  term.skin('.calc-terminal');

  var macwidget = new Macwidget();
  macwidget.skin('.calc-macwidget');

  var custom = new Custom();
  custom.skin('.calc-custom');

  var i;
  var elem;
  var tabindex = [
    '.hamburger-menu',
    '.item-terminal',
    '.item-macwidget',
    '.item-custom',
    '.github-profile',
    '.github-project',
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
    '.calc-macwidget [data-name="clear"]',
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
  ];
  for (i = 1; i <= tabindex.length; i += 1) {
    elem = document.querySelector(tabindex[i - 1]);
    if (elem) { elem.setAttribute('tabindex', i); }
  }
};
