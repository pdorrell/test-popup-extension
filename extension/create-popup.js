function inspect(object) {
  return JSON.stringify(object);
}

var popupHtmlUrl = chrome.extension.getURL("popup.html");

function createPopup() {

  function windowOpen() {
    window.open(popupHtmlUrl , '',
                'width=800,height=600,top=300,left=300,menubar=0,' + 
                'status=0,scrollbars=0,location=0,toolbar=0,resizable=1');
  }
  
  function windowShowModalDialog() {
    window.showModalDialog(popupHtmlUrl);
  }
  
  function chromeWindowsCreate() {
    chrome.runtime.sendMessage({type: "openPopupWindow", url: popupHtmlUrl}, 
                               function(response) {
                                 console.log("chromeWindowsCreate, response = " + inspect(response));
                               });
  }

  function handlePopupMessage(event) {
    console.log("handlePopupMessage");
    console.log(" origin = " + inspect(event.origin) + ", data = " + inspect(event.data));
    console.log(" this.window = origin = " + (this.window === event.origin));
  }
  this.window = chromeWindowsCreate();
  this.window.testData = ["Some test data"];
  this.window.addEventListener("message", handlePopupMessage, false);
}

createPopup();
