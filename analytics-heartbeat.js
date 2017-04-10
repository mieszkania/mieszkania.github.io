(function() {
  var start_ms = Date.now();
  var delay_ms = 1000;
  var multiplier = 1.1;
  var scrolled = false;

  function sendHeartbeat() {
    var seconds = Math.floor((Date.now() - start_ms) / 1000);
    ga('send', 'event', 'Heartbeat', 'Thump', {
      eventValue: seconds,
      nonInteraction: !scrolled,
    });
    scheduleHeartbeat();
  }

  function scheduleHeartbeat() {
    scrolled = false;
    setTimeout(sendHeartbeat, delay_ms);
    delay_ms *= multiplier;
  }

  window.addEventListener('scroll', function() {
    scrolled = true;
  });
  scheduleHeartbeat();
})();
