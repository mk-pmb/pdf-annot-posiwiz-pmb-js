﻿/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = exports, D = require('dom80-pmb'), cssPx = D.css.px0;

  EX.on.img_bgpic_click = function (ev) {
    var ann = EX.getAnnotContainerFor(this);
    ann.innerHTML += (EX.annotSep + '<ins class="annot" style="left: '
      + Math.round(ev.elemX) + 'px; top: ' + Math.round(ev.elemY)
      + 'px"><input class="annot" type="text"></ins>');
    ann.lastElementChild.firstChild.focus();
  };

  EX.on.input_sort_annots_click = function () {
    var pga = EX.getAnnotContainerFor(this), ann = Array.from(pga.children);
    ann.sort(function (a, b) {
      var d = cssPx(a, 'top') - cssPx(b, 'top');
      if (d) { return d; }
      d = cssPx(a, 'left') - cssPx(b, 'left');
      return (d || 0);
    });
    pga.innerHTML = ann.map(function (el) {
      return EX.annotSep + el.outerHTML;
    }).join('');
  };

  EX.scanAnnots = function (evTgt) {
    var pga = EX.getAnnotContainerFor(evTgt), ann = [];
    Array.from(pga.children).forEach(function found(ch) {
      ann.push([cssPx(ch, 'left'), cssPx(ch, 'top'),
        'text', ch.firstChild.value]);
    });
    return ann;
  };

  EX.on.input_dump_annots_json_click = function () {
    EX.codebox('[\n' + EX.scanAnnots(this).map(function (ann) {
      return '[' + JSON.stringify(ann, null, 1).slice(3).replace(/\n/g, '');
    }).concat('null').join(',\n') + ']');
  };

  EX.on.input_dump_annots_ann_click = function () {
    EX.codebox(EX.fmtAnn(EX.scanAnnots(this)));
  };

}());
