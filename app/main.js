/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var D = window.dom80pmb, form = document.forms[0], EX = form.magic,
    codebox = form.elements.codebox;
  form.onsubmit = function never() { return false; };
  if (!EX) {
    EX = {};
    form.magic = EX;
  }
  EX.pageSep = '\n\n  ';
  EX.annotSep = '\n    ';

  function orf(x) { return x || false; }
  function ores(x) { return x || ''; }
  function arg2this(f) { return function g(x) { return f.call(x); }; }
  function cssPx(e, p) { return +(ores(orf(e.style)[p]).replace(/px$/, '')); }

  EX.on = window.setupClassNameEventHandlers({ hookOnto: form, events: [
    'change',
    'click',
    'keydown',
    'keypress',
    'keyup',
  ] }).on;

  EX.on.input_reload_script_click = function () {
    var t = Date.now(), d = this.nextElementSibling,
      s = document.createElement('script');
    d.innerHTML = '';
    s.src = 'puttexts.js?ts=' + t;
    d.appendChild(s);
    D.qsMap('head style', function reTs(el) {
      el.innerHTML = el.innerHTML.replace(/(\?ts)=\d+/g, '$1=' + t);
    });
  };


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

  (function () {
    function upd() {
      var img = this.closest('section').querySelector('.bgpic');
      // console.log('bgfile_change:', this, img);
      readFileInput(this, 'DataURL', function has(url) { img.src = url; });
    }
    EX.on.input_bgfile_change = upd;
    D.qsMap('input.bgfile', arg2this(upd));
  }());

  function getAnnotContainerFor(evTgt) {
    return evTgt.closest('section').querySelector('.page-annots');
  }

  EX.on.img_bgpic_click = function (ev) {
    var ann = getAnnotContainerFor(this);
    ann.innerHTML += (EX.annotSep + '<ins class="annot" style="left: '
      + Math.round(ev.elemX) + 'px; top: ' + Math.round(ev.elemY)
      + 'px"><input class="annot" type="text"></ins>');
    ann.lastElementChild.firstChild.focus();
  };

  EX.on.input_erase_annots_click = function () {
    getAnnotContainerFor(this).innerHTML = '';
  };

  EX.on.input_annot_change = function () {
    // Sync value to HTML so it's affected by {inn,out}erHTML operations
    if (this.getAttribute('value') !== this.value) {
      this.setAttribute('value', this.value);
    }
  };

  (function () {
    function move(el, axis, delta) {
      var par = el.parentNode;
      par.style[axis] = (cssPx(par, axis) + delta) + 'px';
    }
    var emptyTextKeys = {
      ArrowDown: function (el) { move(el, 'top', 1); },
      ArrowLeft: function (el) { move(el, 'left', -1); },
      ArrowRight: function (el) { move(el, 'left', 1); },
      ArrowUp: function (el) { move(el, 'top', -1); },
      Enter: function (el) { D.rmTag(el.parentNode); },
    };
    EX.on.input_annot_keypress = function (ev) {
      this.style.width = Math.min(this.value.length + 2, 15) + 'ex';
      if (!this.value) { (emptyTextKeys[ev.key] || Boolean)(this); }
    };
  }());

  function stubSorry() { window.alert('Not implemented yet, sorry!'); }
  EX.on.input_move_page_prev_click = stubSorry;
  EX.on.input_move_page_next_click = stubSorry;

  EX.on.input_dupe_page_click = function () {
    var pg = this.closest('section');
    pg.outerHTML += EX.pageSep + pg.outerHTML;
  };

  EX.on.input_load_annots_html_click = function () {
    getAnnotContainerFor(this).innerHTML += '\n' + codebox.value;
  };

  EX.on.input_sort_annots_click = function () {
    var pga = getAnnotContainerFor(this), ann = Array.from(pga.children);
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

  EX.on.input_dump_annots_html_click = function () {
    codebox.value = getAnnotContainerFor(this).innerHTML;
  };

  EX.on.input_dump_annots_ann_click = function () {
    var pga = getAnnotContainerFor(this), ann = [];
    Array.from(pga.children).forEach(function found(child) {
      var ln = cssPx(child, 'left');
      return ln;
    });
    codebox.value = ann.join('');
  };


















}());
