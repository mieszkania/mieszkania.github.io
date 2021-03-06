(function() {
  function reportClick(event) {
    var element = event.currentTarget;
    ga('send', 'event', 'Clicks', 'Click', {
      eventLabel: element.id || element.getAttribute('href'),
    });
  }

  function findElements() {
    var elements = document.getElementsByClassName('report-clicks');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.id || element.href) {
        element.addEventListener('click', reportClick);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', findElements);
})();
