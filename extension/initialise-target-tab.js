function inspect(object) {
  return JSON.stringify(object);
}

function TitledWindow() {
}

TitledWindow.prototype = {
  public: {getPageDetails: true, setWindowTitle: true}, 
  
  getPageDetails: function(request, sendResponse) {
    console.log("getTitle ...");
    var title = $("title").text();
    console.log("title from jquery = " + inspect(title));
    sendResponse({title: title, url: window.location.href});
  }, 
  
  setWindowTitle: function(request, sendResponse) {
    console.log("setWindowTitle ...");
    $("title").text(request.title);
    sendResponse({title: $("title").text()}); // return updated title
  }
};

var titledWindow = new TitledWindow();

function handleTitleWindowRequests() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("runtime message " + inspect(request));
    var requestType = request.type;
    if(titledWindow.public[requestType]) {
      titledWindow[requestType](request, sendResponse);
      return true;
    }
  });
}

function createPopupWindowViaChromeRuntime() {
  chrome.runtime.sendMessage({type: "openPopupWindow"}, 
                             function(response) {
                               console.log("chromeWindowsCreate, response = " + inspect(response));
                             });
}

function initialise() {
  if (chrome && chrome.runtime) {
    console.log("Initialising target tab for chrome extension");
    handleTitleWindowRequests();
    createPopupWindowViaChromeRuntime();
  }
}

initialise();
