function inspect(object) {
  return JSON.stringify(object);
}

var messageHandler = {
  getTitle: function(request, sendResponse) {
    console.log("getTitle ...");
    var title = $("title").text();
    console.log("title from jquery = " + inspect(title));
    sendResponse(title);
  }, 
  setWindowTitle: function(request, sendResponse) {
    console.log("setWindowTitle ...");
    $("title").text(request.title);
    sendResponse({title: $("title").text()}); // return updated title
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("runtime message " + inspect(request));
  var handler = messageHandler[request.type];
  if (handler) {
    handler(request, sendResponse);
  }
  return true;
});

function createPopupWindowViaChromeRuntime() {
  chrome.runtime.sendMessage({type: "openPopupWindow"}, 
                             function(response) {
                               console.log("chromeWindowsCreate, response = " + inspect(response));
                             });
}

function initialise() {
  createPopupWindowViaChromeRuntime();
}

initialise();
