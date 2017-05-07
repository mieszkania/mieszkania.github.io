(function() {
  var url = 'https://www.googleadservices.com/pagead/conversion/%id%/' +
            '?label=%label%&guid=ON&script=0';
  var configs = {};

  var plugin = function(tracker, config) {
    configs = config;
  };

  function format(str, replacements) {
    return str.replace(/%(\w+)%/g, function(ignore, tag) {
      return replacements[tag] || '';
    });
  }

  plugin.prototype.send = function(name) {
    var config = configs[name];
    if (!config) {
      return;
    }
    var img = new Image(1, 1);
    img.src = format(url, {
      'id': config.id,
      'label': config.label,
    });
  };

  ga('provide', 'conversions', plugin);
})();
