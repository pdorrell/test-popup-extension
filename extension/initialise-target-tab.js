function inspect(object) {
  return JSON.stringify(object);
}

function TitledWindow() {
}

TitledWindow.prototype = {
  public: {getPageDetails: true, setWindowTitle: true}, 
  
  getPageDetails: function(request, returnValue) {
    console.log("getTitle ...");
    var title = $("title").text();
    console.log("title from jquery = " + inspect(title));
    returnValue({title: title, url: window.location.href});
  }, 
  
  setWindowTitle: function(request, returnValue) {
    console.log("setWindowTitle ...");
    $("title").text(request.title);
    returnValue({title: $("title").text()}); // return updated title
  }
};

var titledWindow = new TitledWindow();

function handleTitleWindowRequests() {
  chrome.runtime.onMessage.addListener(function(request, sender, handleResult) {
    console.log("runtime message " + inspect(request));
    var requestType = request.type;
    if(titledWindow.public[requestType]) {
      titledWindow[requestType](request, handleResult);
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

function createPopupWindowDirectly() {
  var popupWindow = window.open('extension/popup.html','test-popup',
                                'width=500,height=400,top=300,left=300,menubar=0,' + 
                                'status=0,scrollbars=0,location=0,toolbar=0,resizable=1');
  console.log("popupWindow = " + popupWindow);
}

function initialise() {
  if (chrome && chrome.runtime) {
    console.log("Initialising target tab for chrome extension");
    handleTitleWindowRequests();
    createPopupWindowViaChromeRuntime();
  }
  else {
    console.log("Initialising outside of chrome extension");
    createPopupWindowDirectly();
  }
}

initialise();
