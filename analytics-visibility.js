(function() {
  var monitoredElements = [];

  function isVisible(element) {
    var rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight &&
           rect.left < window.innerWidth &&
           rect.bottom > 0 &&
           rect.right > 0;
  }

  function checkElements(event) {
    for (var i = 0; i < monitoredElements.length; i++) {
      var monitor = monitoredElements[i];
      var element = monitor.element;
      var wasVisible = monitor.visible;
      monitor.visible = isVisible(element);
      if (!wasVisible && monitor.visible) {
        ga('send', 'event', 'Visibility', 'Visible', {
          eventLabel: element.id,
          nonInteraction: !event,
        });
      }
    }
  }

  function findElements() {
    allElements = document.getElementsByClassName('report');
    for (var i = 0; i < allElements.length; i++) {
      var element = allElements[i];
      if (element.id) {
        monitoredElements.push({element: element, visible: false});
      }
    }
    if (monitoredElements.length > 0) {
      window.addEventListener('resize', checkElements);
      window.addEventListener('scroll', checkElements);
      checkElements();
    }
  }

  document.addEventListener('DOMContentLoaded', findElements);
})();
