console.log("Hello from call-style-adjuster-popup-callback.js");

function inspect(object) {
  return JSON.stringify(object);
}

var targetTabId = null;

function updateTargetTabTitle() {
  chrome.tabs.sendMessage(targetTabId, {type: "setWindowTitle", title: $("#title").val()}, 
                          function response(response) {
                            console.log("updateTargetTabTitle, response = " + inspect(response));
                          });
}

function initialise() {
  console.log("sendTheMessage ...");
  console.log("window = " + window);
  console.log("window.testData = " + inspect(window.testData));
  
  chrome.runtime.sendMessage({type: "getTitle"}, 
                               function(result) {
                                 console.log("getTitle result = " + inspect(result));
                                 targetTabId = result.targetTabId;
                                 $("#targetTabId").text(targetTabId);
                                 $("#title").val(result.title);
                               });
  
  $("#title").on("keypress", function(event, ui) {
      if (event.which == 13) {
        updateTargetTabTitle();
      }
  });

  $("#updateTitle").click(function() {
        updateTargetTabTitle();
  });

  window.postMessage({greeting: "Hello World from popup"}, "*");
}

$(document).ready(function(){
  console.log("Document ready ...");
  initialise();
});

