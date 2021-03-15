
<!--#echo json="package.json" key="name" underline="=" -->
pdf-annot-posiwiz-pmb
=====================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
An improvised SPA for Waterfox to find text positions for pdf-annot-pmb.
<!--/#echo -->



Usage
-----

* Generate preview images, e.g. `pdf2png --dpi=127 --grey orig.pdf`
  * 127 dpi = 5 px/mm
* Click &#x1F4F7; (photo camera) to load an image.
* Click into the preview image to add an annotation.
* Special effect keys when the annotation is empty:
  * Cursor keys: move it by one pixel.
  * Enter: remove it.
* Hover over &#x2328; (keyboard) to show the "code box", a big text field.
  * Click &#x2328; to select all text in it.
* Click &#x1F4BE; (floppy disk)
  to save current annotations into the code box in raw HTML format.
* Click &#x2339; (double drawer cupboard)
  to save current annotations into the code box in JSON format.
* Click &#x1F4C2; (open folder) to add the raw HTML from the code box to
  the current annotations.
* Click &#x21C5; (up/down arrows) to sort current annotations top-to-bottom
  and left-to-right.
  This affects their relative depth, i.e. order of painting, and thus overlap.
  Sorting should not have any effect if the fields are already sorted.
  Changes in depth ordering may or may not cause visible effects.
* Click &#x2386; (arrow into diamond) to write the current annotations into
  the code box in a format compatible to `pdf-annot-pmb`.



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
