(function() {
  var url = 'https://www.googleadservices.com/pagead/conversion';

  var plugin = function(tracker, config) {};

  plugin.prototype.send = function(id, label) {
    var img = new Image(1, 1);
    img.src = url + '/' + id + '/?label=' + label + '&guid=ON&script=0';
  };

  ga('provide', 'conversions', plugin);
})();
