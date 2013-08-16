function inspect(object) {
  return JSON.stringify(object);
}

var targetTabId = null;

function updateTitle(targetTitle) {
  $("title").text("Test Popup: " + targetTitle);
}  

function updateTargetTabTitle() {
  chrome.tabs.sendMessage(targetTabId, {type: "setWindowTitle", title: $("#title").val()}, 
                          function(response) {
                            updateTitle(response.title);
                            console.log("updateTargetTabTitle, response = " + inspect(response));
                          });
}

function initialise() {
  targetTabId = parseInt(window.location.search.substring(1));
  console.log("targetTabId = " + inspect(targetTabId));
  $("#targetTabId").text(targetTabId);
  chrome.tabs.sendMessage(targetTabId,
                          {type: "getPageDetails"}, 
                          function(result) {
                            console.log("getPageDetails result = " + inspect(result));
                            $("#title").val(result.title);
                            $("#url").text(result.url);
                            updateTitle(result.title);
                          });
  
  $("#title").on("keypress", function(event, ui) {
      if (event.which == 13) {
        updateTargetTabTitle();
      }
  });

  $("#updateTitle").click(function() {
        updateTargetTabTitle();
  });
  
  $("#title").focus();
}

$(document).ready(function(){
  console.log("Document ready ...");
  initialise();
});

