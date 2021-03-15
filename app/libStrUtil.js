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
    var st = { prevAnnot: false };
    function delegate(a) {
      var how = EX['fmtAnn_' + a.type], code;
      D.needType.fun(a.how, 'Annotation formatter for type ' + a.type);
      code = how(a, st);
      st.prevAnnot = a;
      return code;
    }
    return annots.filter(Boolean).map(delegate).join('\n');
  }
  EX.fmtAnn = fmtAnn;

  EX.fmtAnn_text = function (ann, st) {
    return ('    '
      + EX.annPosNumFmt(ann.mmLeft)
      + EX.annPosNumFmt(ann.mmTop - (st.prevAnnot.mmTop || 0))
      + '    (' + ann.value.replace(/[\\\(\)]/g, '\\$1') + ')');
  };




















}());
