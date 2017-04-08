(function() {
  var start_ms = Date.now();
  var delay_ms = 1000
  var multiplier = 1.1

  function sendHeartbeat() {
    var seconds = Math.floor((Date.now() - start_ms) / 1000);
    ga('send', 'event', 'Heartbeat', 'Thump', undefined, seconds);
    setHeartbeat();
  }

  function setHeartbeat() {
    setTimeout(sendHeartbeat, delay_ms);
    delay_ms *= multiplier;
  }

  setHeartbeat();
})();
