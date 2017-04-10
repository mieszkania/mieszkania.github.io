(function(){
  var img = document.createElement('img');
  img.style.position = 'absolute';
  img.style.margin = 'auto';
  img.style.maxWidth = '90%';
  img.style.maxHeight = '90%';
  img.style.border = 'solid 1ex white';
  img.style.top = '0';
  img.style.bottom = '0';
  img.style.left = '0';
  img.style.right = '0';

  var div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.left = '0';
  div.style.top = '0';
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.background = 'rgba(0,0,0,0.8)';
  div.style.zIndex = 10;
  div.appendChild(img);

  function close() {
    document.body.removeChild(div);
    div.removeEventListener('click', close);
  }

  function open(image) {
    img.src = image;
    setTimeout(function() {
      div.addEventListener('click', close);
      document.body.appendChild(div);
    }, 150);
    ga('send', 'event', 'Image', 'Open', image.split('/').pop());
  }

  window.zoom = function(element) {
    open(element.href || element.src);
    return false;
  };
})();
