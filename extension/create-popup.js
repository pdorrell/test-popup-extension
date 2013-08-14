function inspect(object) {
  return JSON.stringify(object);
}

function createPopup() {

  var popupHtmlUrl = chrome.extension.getURL("popup.html");

  function handlePopupMessage(event) {
    console.log("handlePopupMessage");
    console.log(" origin = " + inspect(event.origin) + ", data = " + inspect(event.data));
    console.log(" this.window = origin = " + (this.window === event.origin));
  }
  this.window = window.open(popupHtmlUrl + "?" + window.location, '',
                            'width=800,height=600,top=300,left=300,menubar=0,' + 
                            'status=0,scrollbars=0,location=0,toolbar=0,resizable=1');
  this.window.addEventListener("message", handlePopupMessage, false);
}

createPopup();
