/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var D = window.dom80pmb, form = document.forms[0],
    rxpl = D.rxpl,
    EX = form.magic;
  form.onsubmit = function never() { return false; };
  if (!EX) {
    EX = {};
    form.magic = EX;
  }
  EX.pageSep = '\n\n  ';
  EX.annotSep = '\n    ';
  EX.normWsp = function (v) { return rxpl(rxpl(v, /^\s*\n/), /\s*$/, '\n'); };

  EX.on = window.setupClassNameEventHandlers({ hookOnto: form, events: [
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
  }(form.elements.codebox));





















}());
