/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = exports, D = require('dom80-pmb');

  // Sync value to HTML so it's affected by {inn,out}erHTML operations
  function sync(el) { sync[D.lcTag(el)](el); }
  sync.ctx = function () { sync(this); };
  EX.syncFieldValueToHtml = sync;

  sync.input = function (el) {
    if (el.getAttribute('value') === el.value) { return; }
    el.setAttribute('value', el.value);
  };

  sync.textarea = function (el) {
    if (el.innerText !== el.value) { el.innerText = el.value; }
  };
















}());
