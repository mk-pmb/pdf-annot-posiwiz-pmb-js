/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = exports, D = require('dom80-pmb'), cssPx = D.css.px0;

  EX.on.img_bgpic_click = function (ev) {
    var ann, ins, what = EX.firstCheckedInput('insert_what');
    if (!what) { return; }
    ins = what.parentNode.nextElementSibling.innerHTML;
    ins = ins.trim().replace(/\s*\n\s*/g, ' ').replace(/\s+(>)/g, '$1');
    ann = EX.getAnnotContainerFor(this);
    ann.innerHTML += EX.annotSep + ins;
    ins = ann.lastElementChild;
    ins.dataset.type = what.parentNode.innerText.trim();
    ins.style.left = Math.round(ev.elemX) + 'px';
    ins.style.top = Math.round(ev.elemY) + 'px';
    D.ifMtd(ins.firstChild, 'focus', Boolean)();
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
    var pg = evTgt.closest('section'),
      ann = Array.from(EX.getAnnotContainerFor(evTgt).children),
      dpi = (+pg.querySelector('.image-dpi input').value || 0);
    if (dpi < 0.01) { throw new Error('Resolution (dpi) too low'); }
    function mmProp(o, e, p) {
      o['mm' + p] = (cssPx(e, p.toLowerCase()) * EX.mmPerInch) / dpi;
    }
    ann = ann.map(function found(e) {
      var c = e.firstChild, o = { type: e.dataset.type, value: c.value };
      mmProp(o, e, 'Left');
      mmProp(o, e, 'Top');
      if (c.style.height) {
        mmProp(o, c, 'Width');
        mmProp(o, c, 'Height');
      }
      return o;
    });
    ann.dpi = dpi;
    ann.mmPerPx = EX.mmPerInch / dpi;
    // ^-- ATTN: Imprecise! For best precision, multiply before division!
    return ann;
  };

  EX.on.input_dump_annots_json_click = function () {
    EX.codebox('[\n' + EX.scanAnnots(this).map(function (ann) {
      return '{' + JSON.stringify(ann, null, 1).slice(3).replace(/\n/g, '');
    }).concat('null').join(',\n') + ']');
  };

  EX.on.input_dump_annots_ann_click = function () {
    EX.codebox(EX.fmtAnn(EX.scanAnnots(this)));
  };

}());
