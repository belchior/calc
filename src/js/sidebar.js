
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var layouts = ['modal-sidebar', 'normal', 'compressed', 'top'];
  var app = document.querySelector('.app');
  var header = app.querySelector('.header');
  var sidebar = app.querySelector('.sidebar');
  var sidebarWrapper = app.querySelector('.sidebar-wrapper');
  var hamburgerMenu = app.querySelector('.hamburger-menu');
  var menuLinks = app.querySelectorAll('.menu .list-item:not(.external)');
  var layoutOptions = app.querySelectorAll('.layout .list-item');

  var sidebarEvent = function (fn) {
    return function () {
      sidebarWrapper.scrollTop = 0;
      fn.apply(this, arguments);
    };
  };

  var hamburgerMenuEvent = sidebarEvent(function (event) {
    app.classList.toggle('modal-sidebar');
  });

  var layoutOptionEvent = sidebarEvent(function (event) {
    var layoutName = this.dataset.option;
    layouts.forEach(function (layout) {
      app.classList.remove(layout);
    });
    app.classList.add(layoutName);
  });

  var menuLinksEvent = sidebarEvent(function (event) {
    var hash = this.hash;
    showArticle(hash);
    sidebar.classList.remove('active');
  });

  var closeSidebar = function (event) {
    app.classList.remove('modal-sidebar');
  };

  var showArticle = function (query) {
    removeClass('.article', 'active');
    addClass(query, 'active');
  };

  var stopPropagation = function (event) {
    event.stopPropagation();
  };

  var addClass = function (query, className) {
    forEachNode(document.querySelectorAll(query), function (item) {
      item.classList.add(className);
    });
  };

  var removeClass = function (query, className) {
    forEachNode(document.querySelectorAll(query), function (item) {
      item.classList.remove(className);
    });
  };

  var forEachNode = function (nodeList, cb) {
    var i;
    try {
      for (i = 0; i < nodeList.length; i += 1) {
        cb(nodeList[i]);
      }
    } catch (e) {
      console.error('An error occurred when try to iterate over a nodeList\n', e);
    }
  };

  if (location.hash) {
    showArticle(location.hash);
  } else {
    showArticle('#custom');
  }

  sidebar.addEventListener('click', closeSidebar);
  sidebarWrapper.addEventListener('click', stopPropagation);
  hamburgerMenu.addEventListener('click', hamburgerMenuEvent);
  forEachNode(menuLinks, function (item) {
    item.addEventListener('click', menuLinksEvent);
    item.addEventListener('click', closeSidebar);
  });
  forEachNode(layoutOptions, function (item) {
    item.addEventListener('click', layoutOptionEvent);
  });
});
