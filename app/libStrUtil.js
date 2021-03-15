/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = exports, D = require('dom80-pmb'), rxpl = D.rxpl;

  EX.normWsp = function (v) { return rxpl(rxpl(v, /^\s*\n/), /\s*$/, '\n'); };

  EX.annPosNumFmt = function (v) {
    if (!v) { return '   0'; }
    v = v.toFixed(3).replace(/\.0+$/, '');
    v = v.replace(/\.?0+$/, function (m) { return m.replace(/0/g, ' '); });
    v = '    '.slice(v.length % 4) + v;
    return v;
  };

  function fmtAnn(annots) {
    return annots.filter(Boolean).map(fmtAnn.delegate).join('\n');
  }
  EX.fmtAnn = fmtAnn;
  fmtAnn.delegate = function fmtAnnDelegate(a) {
    a = a.slice();
    a.left = a.shift();
    a.top = a.shift();
    a.type = a.shift();
    a.how = EX['fmtAnn_' + a.type];
    D.needType.fun(a.how, 'Annotation formatter for type ' + a.type);
    return a.how(a);
  };

  EX.fmtAnn_text = function (ann) {
    return ('    '
      + EX.annPosNumFmt(ann.left)
      + EX.annPosNumFmt(ann.top)
      + '    (' + ann[0].replace(/[\\\(\)]/g, '\\$1') + ')');
  };




















}());
