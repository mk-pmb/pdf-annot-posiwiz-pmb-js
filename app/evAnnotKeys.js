/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = exports, D = require('dom80-pmb'), cssPx = D.css.px0;

  function move(el, axis, delta) {
    var par = el.parentNode;
    par.style[axis] = (cssPx(par, axis) + delta) + 'px';
  }

  function onKey(ev) {
    this.style.width = Math.min(this.value.length + 2, 15) + 'ex';
    if (!this.value) { (onKey.emptyTextKeys[ev.key] || Boolean)(this); }
  }

  onKey.emptyTextKeys = {
    ArrowDown: function (el) { move(el, 'top', 1); },
    ArrowLeft: function (el) { move(el, 'left', -1); },
    ArrowRight: function (el) { move(el, 'left', 1); },
    ArrowUp: function (el) { move(el, 'top', -1); },
    Enter: function (el) { D.rmTag(el.parentNode); },
  };
  EX.on.input_annot_keypress = onKey;

  EX.on.input_annot_change = function () {
    // Sync value to HTML so it's affected by {inn,out}erHTML operations
    if (this.getAttribute('value') !== this.value) {
      this.setAttribute('value', this.value);
    }
  };

}());
