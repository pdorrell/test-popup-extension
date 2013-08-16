function inspect(object) {
  return JSON.stringify(object);
}

function TitledWindow(window, $) {
  this.window = window;
  this.$ = $;
}

TitledWindow.prototype = {
  getPageDetails: function(request, sendResponse) {
    console.log("getTitle ...");
    var title = this.$("title").text();
    console.log("title from jquery = " + inspect(title));
    sendResponse({title: title, url: this.window.location.href});
  }, 
  
  setWindowTitle: function(request, sendResponse) {
    console.log("setWindowTitle ...");
    this.$("title").text(request.title);
    sendResponse({title: this.$("title").text()}); // return updated title
  }
};

var titledWindow = new TitledWindow(window, $);

var titledWindowMessageHandler = {
  getPageDetails: function(request, sendResponse) {
    titledWindow.getPageDetails(request, sendResponse);
  }, 
  setWindowTitle: function(request, sendResponse) {
    titledWindow.setWindowTitle(request, sendResponse);
  }
}

function handleTitleWindowRequests() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("runtime message " + inspect(request));
    var handler = titledWindowMessageHandler[request.type];
    if (handler) {
      handler(request, sendResponse);
    }
    return true;
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
