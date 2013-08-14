console.log("Hello from call-style-adjuster-popup-callback.js");

function sendTheMessage() {
  console.log("sendTheMessage ...");
  console.log("window = " + window);
  window.postMessage({greeting: "Hello World from popup"}, "*");
}

window.onload = sendTheMessage;
