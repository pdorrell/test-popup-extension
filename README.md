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
