(function(){
  var img = document.createElement('img');
  img.sizes = '(max-aspect-ratio: 1/1) 100vh, 100vw'

  var div = document.createElement('div');
  div.className = 'fullscreen'
  div.appendChild(img);

  function close() {
    document.body.removeChild(div);
    div.removeEventListener('click', close);
  }

  function open(image) {
    img.srcset = image.srcset;
    img.src = image.src;
    setTimeout(function() {
      div.addEventListener('click', close);
      document.body.appendChild(div);
    }, 150);
  }

  window.zoom = function(element) {
    open(element.getElementsByTagName('img')[0]);
    return false;
  };
})();
