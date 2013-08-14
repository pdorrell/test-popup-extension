console.log("Hello from call-style-adjuster-popup-callback.js");

function inspect(object) {
  return JSON.stringify(object);
}

function initialise() {
  console.log("sendTheMessage ...");
  console.log("window = " + window);
  console.log("window.testData = " + inspect(window.testData));
  
  chrome.runtime.sendMessage({type: "getTitle"}, 
                               function(title) {
                                 console.log("getTitle result = " + inspect(title));
                                 $(window).data("title", title);
                                 $("#title").text(title);
                               });

  window.postMessage({greeting: "Hello World from popup"}, "*");
}

window.onload = initialise;
