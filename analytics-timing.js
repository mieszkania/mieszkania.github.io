(function() {
  function sendTiming() {
    t = performance.timing;
    start = t.fetchStart;
    ga('send', 'timing', 'Loading', 'Responded', t.responseStart - start);
    ga('send', 'timing', 'Loading', 'Interactive', t.domInteractive - start);
    ga('send', 'timing', 'Loading', 'Loaded', t.loadEventStart - start);
  }

  if (window.performance && performance.timing) {
    window.addEventListener("load", sendTiming);
  }
})();
