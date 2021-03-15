/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = exports, D = require('dom80-pmb'),
    sync = EX.syncFieldValueToHtml,
    cssPx = D.css.px0;

  function move(el, axis, delta) {
    var par = el.parentNode;
    par.style[axis] = (cssPx(par, axis) + delta) + 'px';
  }

  EX.on.input_annot_text_value_changeLate = sync.ctx;
  EX.on.textarea_annot_rect_name_changeLate = sync.ctx;

  function onTextKey(ev) {
    // setTimeout(sync.bind(null, ev.target), 5);
    sync(ev.target);
    if (ev.target.type === 'text') {
      this.style.width = Math.min(this.value.length + 2, 15) + 'ex';
    }
    if (!this.value) { (onTextKey.emptyTextKeys[ev.key] || Boolean)(this); }
  }

  onTextKey.emptyTextKeys = {
    ArrowDown: function (el) { move(el, 'top', 1); },
    ArrowLeft: function (el) { move(el, 'left', -1); },
    ArrowRight: function (el) { move(el, 'left', 1); },
    ArrowUp: function (el) { move(el, 'top', -1); },
    Enter: function (el) { D.rmTag(el.parentNode); },
  };
  EX.on.input_annot_text_value_keypressLate = onTextKey;
  EX.on.textarea_annot_rect_name_keypressLate = onTextKey;

}());
