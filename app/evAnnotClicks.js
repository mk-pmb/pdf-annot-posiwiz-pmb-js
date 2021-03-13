/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var D = window.dom80pmb,
    cssPx = D.css.px0,
    EX = document.forms[0].magic;

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

  EX.on.input_dump_annots_ann_click = function () {
    var pga = EX.getAnnotContainerFor(this), ann = [];
    Array.from(pga.children).forEach(function found(child) {
      var ln = cssPx(child, 'left');
      return ln;
    });
    EX.codebox(ann.join(''));
  };

}());
