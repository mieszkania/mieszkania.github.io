var elements = [];

function isVisible(element) {
  var rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight &&
         rect.left < window.innerWidth &&
         rect.bottom > 0 &&
         rect.right > 0;
}

function reportVisible() {
  elements = Array.prototype.filter.call(elements, function(element) {
    if (isVisible(element)) {
      ga('send', 'event', 'Visibility', element.id);
      return false;
    }
    return true;
  });
  if (elements.length == 0) {
    window.removeEventListener('resize', reportVisible);
    window.removeEventListener('scroll', reportVisible);
  }
}

function findElements() {
  elements = document.getElementsByClassName('report');
  elements = Array.prototype.filter.call(elements, function(element) {
    return !!element.id;
  });
  if (element.length > 0) {
    window.addEventListener('resize', reportVisible);
    window.addEventListener('scroll', reportVisible);
    reportVisible();
  }
}

window.addEventListener('DOMContentLoaded', findElements);
