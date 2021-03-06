Test Chrome Extension with Popup Window
=======================================

This project is an example of a Chrome Extension which brings up a pop-up window
when the extension action is clicked, where the popup-window uses messaging in order
to take actions on the target tab.

This particular extension retrieves the title of the target tab, and allows the user
to update the title.

Installation
------------

To install it, do the following:

* Check out this repository.
* In **Google Chrome** or **Chromium**, go to the **Extensions** page (under **Tools**).
* Select **"Developer mode"**.
* Click the **"Load unpacked extension ..."** button.
* Select the **extensions** sub-directory of this project.
* Then, in the browser, navigate to a given web page, and select the extension icon (a default jigsaw puzzle picture to the right of the browser address field), to active the extension.

Run it without installation
---------------------------

The project is configured so that the functionality of the extension can be run directly
inside a test web page &ndash; open the file **index.html** in a web browser (enable popups
if necessary), and the popup window will appear and let you change the title of that page.

This is an easier way to run code during development, since your edit-compile-run cycle is:

* Edit and save code
* Refresh page in browser

instead of:

* Edit and save code
* Refresh extension in browser
* Refresh page in browser
* Click on extension icon

You can access a copy of the same test web page at http://pdorrell.github.io/test-popup-extension/.
