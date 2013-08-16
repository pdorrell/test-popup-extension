function inspect(object) {
  return JSON.stringify(object);
}

var titledWindow = null;

function TitledWindowProxy(tabId) {
  this.tabId = tabId;
}

TitledWindowProxy.prototype = {
  getPageDetails: function(handleResult) {
    chrome.tabs.sendMessage(this.tabId, 
                            {type: "getPageDetails"}, 
                            function(result) { handleResult(result); });
  }, 
  setWindowTitle: function(title, handleResult) {
    chrome.tabs.sendMessage(this.tabId, {type: "setWindowTitle", title: title}, 
                            function(result) { handleResult(result); });
  }
};

function updateTitle(targetTitle) {
  $("title").text("Test Popup: " + targetTitle);
}  

function updateTargetTabTitle() {
  titledWindow.setWindowTitle($("#title").val(), 
                              function(result) {
                                updateTitle(result.title);
                                console.log("updateTargetTabTitle, result = " + inspect(result));
                              });
}

function initialiseTitleWindowFromOpener() {
  console.log("initialiseTitleWindowFromOpener, window.opener = " + window.opener);
  titledWindow = window.opener.titledWindow;
  console.log("titledWindow = " + titledWindow);
  $("#targetTabId").hide();
}

function initialiseTitleWindowProxy() {
  console.log("initialiseTitleWindowProxy ...");
  var targetTabId = parseInt(urlQueryString.substring(1));
  console.log(" targetTabId = " + inspect(targetTabId));
  titledWindow = new TitledWindowProxy(targetTabId);
  $("#targetTabId").text(targetTabId);
}

function initialise() {
  var urlQueryString = window.location.search;
  console.log("urlQueryString = " + inspect(urlQueryString));
  if (urlQueryString == "") {
    initialiseTitleWindowFromOpener();
  }
  else {
    initialiseTitleWindowProxy();
  }
  
  titledWindow.getPageDetails(function(result) {
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

