var delay_ms = 1000
var multiplier = 1.1

function sendHeartbeat() {
  ga('send', 'event', 'Heartbeat', 'Thump');
  setHeartbeat();
}

function setHeartbeat() {
  setTimeout(sendHeartbeat, delay_ms);
  delay_ms *= multiplier;
}

setHeartbeat();
