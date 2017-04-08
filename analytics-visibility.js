var elements = [];

function isVisible(element) {
  var rect = element.getBoundingClientRect();
  return rect.top >= 0 &&
         rect.left >= 0 &&
         rect.bottom <= window.innerHeight &&
         rect.right <= window.innerWidth;
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
