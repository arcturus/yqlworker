var elem = document.getElementById('message');

var worker = new YQLWorker('http://pastebin.mozilla.org/?dl=8760055');
worker.onmessage = function (msg){
  elem.textContent = JSON.stringify(msg);
};
worker.onerror = function(msg) {
  console.error(msg);
}
worker.postMessage();
