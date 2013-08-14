console.log("Hello from call-style-adjuster-popup-callback.js");

function inspect(object) {
  return JSON.stringify(object);
}

function sendTheMessage() {
  console.log("sendTheMessage ...");
  console.log("window = " + window);
  console.log("window.testData = " + inspect(window.testData));
  window.postMessage({greeting: "Hello World from popup"}, "*");
}

window.onload = sendTheMessage;
