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
    if (!config || !config.tags) {
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
    for (var i = 0; i < config.tags.length; i++) {
      var tag = config.tags[i];
      var img = new Image(1, 1);
      img.src = format(url, {
        'id': tag.id,
        'label': tag.label,
      });
    }
  };

  ga('provide', 'conversions', plugin);
})();
