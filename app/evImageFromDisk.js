/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = exports, D = require('dom80-pmb');
  function orf(x) { return x || false; }

  function readFileInput(ff, as, cb) {
    if (!ff) { return false; }
    var f0 = orf(ff.files)[0], rd, mtd;
    if (!f0) { return false; }
    rd = new window.FileReader();
    rd.onload = function (ev) { cb.call(ff, ev.target.result); };
    mtd = rd['readAs' + as];
    mtd.call(rd, f0);
    return ff;
  }

  function upd() {
    var img = this.closest('section').querySelector('.bgpic');
    // console.log('bgfile_change:', this, img);
    readFileInput(this, 'DataURL', function has(url) { img.src = url; });
  }

  EX.on.input_bgfile_change = upd;
  D.qsMap('input.bgfile', D.arg2this(upd));

}());
