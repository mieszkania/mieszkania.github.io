(function() {
  var monitoredElements = [];
  var scrolled = false;
  var lastIntegration;
  var timedArea;
  var reporter;

  function integrate(interaction) {
    var now = Date.now();
    var elapsed = now - lastIntegration;
    lastIntegration = now;
    for (var i = 0; i < monitoredElements.length; i++) {
      var monitor = monitoredElements[i];
      if (monitor.area > 0) {
        var fraction = monitor.area / timedArea;
        var added = Math.min(elapsed * fraction, monitor.limit);
        monitor.ms += added;
        if (!interaction) {
          monitor.limit -= added;
        }
      }
    }
  }

  function report() {
    integrate(false);
    var maxMs = 0;
    var maxIndex;
    for (var i = 0; i < monitoredElements.length; i++) {
      var monitor = monitoredElements[i];
      if (monitor.ms > maxMs) {
        maxMs = monitor.ms;
        maxIndex = i;
      }
    }
    if (maxMs == 0) {
      clearInterval(reporter);
      reporter = null;
      scrolled = false;
      return;
    }
    var monitor = monitoredElements[maxIndex];
    if (monitor.element.id) {
      ga('send', 'event', 'Visibility', 'Visible', {
        eventLabel: monitor.element.id,
        eventValue: Math.round(monitor.ms),
        nonInteraction: !scrolled,
      });
    }
    monitor.ms = 0;
  }

  function totalArea(element) {
    var rect = element.getBoundingClientRect();
    return rect.width * rect.height;
  }

  function visibleArea(element) {
    if (document.hidden) {
      return 0;
    }
    var rect = element.getBoundingClientRect();
    var y = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    if (y <= 0) {
      return 0;
    }
    var x = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
    if (x <= 0) {
      return 0;
    }
    return x * y;
  }

  function checkElements(event) {
    if (event && event.type == 'scroll') {
      scrolled = true;
    }
    integrate(true);
    timedArea = 0;
    for (var i = 0; i < monitoredElements.length; i++) {
      var monitor = monitoredElements[i];
      monitor.area = visibleArea(monitor.element);
      if (monitor.area > 0) {
        timedArea += monitor.area;
        var fraction = monitor.area / totalArea(monitor.element);
        monitor.limit = monitor.element.getAttribute('data-timing') * fraction;
      } else {
        monitor.limit = 0;
      }
    }
    if (!reporter && timedArea > 0) {
      reporter = setInterval(report, 1000);
    }
  }

  function findElements() {
    var allElements = document.querySelectorAll('[data-timing]');
    for (var i = 0; i < allElements.length; i++) {
      var element = allElements[i];
      monitoredElements.push({element: element, ms: 0});
    }
    if (monitoredElements.length > 0) {
      window.addEventListener('resize', checkElements);
      window.addEventListener('scroll', checkElements);
      document.addEventListener('visibilitychange', checkElements);
      checkElements();
    }
  }

  document.addEventListener('DOMContentLoaded', findElements);
})();
