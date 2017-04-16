(function(){
  var img = document.createElement('img');
  img.sizes = '(max-aspect-ratio: 1/1) 90vh 90vw'
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
    img.srcset = image.srcset;
    img.src = image.src;
    div.addEventListener('click', close);
    document.body.appendChild(div);
    ga('send', 'event', 'Image', 'Open', image.src.split('/').pop());
  }

  window.zoom = function(element) {
    open(element.getElementsByTagName('img')[0]);
    return false;
  };
})();
