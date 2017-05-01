(function() {
  var lastIntegration;
  var totalArea;
  var monitoredElements = [];

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

  function integrate() {
    var now = Date.now();
    var elapsed = now - lastIntegration;
    lastIntegration = now;
    for (var i = 0; i < monitoredElements.length; i++) {
      var monitor = monitoredElements[i];
      if (monitor.area > 0) {
        monitor.ms += elapsed * monitor.area / totalArea;
      }
    }
  }

  function checkElements(event) {
    integrate();
    totalArea = 0;
    for (var i = 0; i < monitoredElements.length; i++) {
      var monitor = monitoredElements[i];
      monitor.area = visibleArea(monitor.element);
      totalArea += monitor.area;
    }
  }

  function findElements() {
    var allElements = document.querySelectorAll('[data-timing]');
    for (var i = 0; i < allElements.length; i++) {
      var element = allElements[i];
      if (element.id) {
        monitoredElements.push({element: element, ms: 0});
      }
    }
    if (monitoredElements.length > 0) {
      window.addEventListener('resize', checkElements);
      window.addEventListener('scroll', checkElements);
      document.addEventListener('visibilitychange', checkElements);
      checkElements();
    }
  }

  document.addEventListener('DOMContentLoaded', findElements);

  window.bla = monitoredElements;
})();
