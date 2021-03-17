/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = exports, D = require('dom80-pmb');


  function posFmt(v) {
    if (!v) { return '   0'; }
    v = v.toFixed(3).replace(/\.0+$/, '');
    v = v.replace(/\.?0+$/, function (m) { return m.replace(/0/g, ' '); });
    v = '    '.slice(v.length % 4) + v;
    return v;
  }
  EX.annPosNumFmt = posFmt;


  function fmtAnn(annots) {
    var code = [], st = {
      prevAnnot: false,
      prevTextLineTop: 0,
    };
    function delegate(a) {
      if (!a) { return; }
      var how = EX['fmtAnn_' + a.type];
      D.needType.fun(how, 'Annotation formatter for type ' + a.type);
      code = code.concat(how(a, st));
      st.prevAnnot = a;
    }
    annots.forEach(delegate);
    code.push('');
    code = code.join('\n').replace(/\s*\n/g, '\n' + fmtAnn.indent);
    code = fmtAnn.indent + (code.trim() || '# No annotations found?');
    return code;
  }
  EX.fmtAnn = fmtAnn;
  fmtAnn.indent = '    ';

  EX.fmtAnn_text = function (ann, st) {
    var code = (posFmt(ann.mmLeft) + posFmt(ann.mmTop - st.prevTextLineTop)
      + '    (' + ann.value.replace(/[\\\(\)]/g, '\\$1') + ')');
    st.prevTextLineTop = ann.mmTop;
    return code;
  };

  EX.fmtAnn_rect = function (ann, st) {
    var rect = ('rgbrect ' + [
      ann.mmLeft,
      ann.mmTop - (st.prevAnnot.mmTop || 0),
      ann.mmWidth,
      ann.mmHeight,
      1.00,
      0.75,
      0.50,
    ].map(posFmt).join(''));
    return [rect, (ann.value && ('# ^-- ' + ann.value))];
  };




















}());
