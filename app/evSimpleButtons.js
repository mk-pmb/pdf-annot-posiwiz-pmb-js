/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var EX = exports, D = require('dom80-pmb');

  function stubSorry() { window.alert('Not implemented yet, sorry!'); }
  EX.on.input_move_page_prev_click = stubSorry;
  EX.on.input_move_page_next_click = stubSorry;

  EX.on.input_reload_scripts_click = function () {
    (EX.reloadScriptResourceTags || stubSorry)(this.nextElementSibling);
  };

  EX.on.input_dupe_page_click = function () {
    var pg = this.closest('section');
    pg.outerHTML += EX.pageSep + pg.outerHTML;
  };

  EX.on.input_load_annots_html_click = function () {
    var html = EX.codebox();
    if (html.match(/^\s*[#%]/)) { html = html.replace(/(^|\n) *[#%]/g, '$1'); }
    EX.getAnnotContainerFor(this).innerHTML += '\n' + html;
  };

  EX.on.input_dump_annots_html_click = function () {
    EX.codebox(EX.getAnnotContainerFor(this).innerHTML);
  };

  EX.on.input_erase_annots_click = function () {
    EX.getAnnotContainerFor(this).innerHTML = '';
  };

  EX.on.input_erase_page_click = function () {
    D.rmTag(this.closest('section'));
  };

}());
