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
    if (config.cookie && config.ttl) {
      var now = new Date();
      var timestamp = Math.floor(now / 1000);
      var regexp = new RegExp('\\b' + config.cookie + '\\s*=\\s*([^;]*)');
      var match = document.cookie.match(regexp);
      if (match && match[1] + config.ttl > timestamp) {
        return;
      }
      var expires = now;
      expires.setFullYear(now.getFullYear() + 2);
      document.cookie = config.cookie + '=' + timestamp + '; path=/' +
                        '; expires=' + expires.toUTCString();
    }
    var img = new Image(1, 1);
    img.src = format(url, {
      'id': config.id,
      'label': config.label,
    });
  };

  ga('provide', 'conversions', plugin);
})();
