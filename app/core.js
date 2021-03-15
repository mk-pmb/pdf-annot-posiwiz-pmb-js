/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = exports;
  EX.form = document.forms[0];
  (EX.form || {}).onsubmit = function never() { return false; };
  EX.pageSep = '\n\n  ';
  EX.annotSep = '\n    ';

  EX.on = window.setupClassNameEventHandlers({ hookOnto: EX.form, events: [
    'change',
    'click',
    'keydown',
    'keypress',
    'keyup',
  ] }).on;

  EX.getAnnotContainerFor = function (evTgt) {
    return evTgt.closest('section').querySelector('.page-annots');
  };

  (function (e) {
    EX.codebox = function (n) {
      var v = e.value;
      if (n || (n === '')) { e.value = EX.normWsp(n); }
      return v;
    };
    EX.on.input_codebox_select_click = function () {
      e.focus();
      e.select();
    };
  }(EX.form.elements.codebox));





















}());
