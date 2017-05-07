(function() {
  function plugin(tracker, config) {
    if (!config.map) {
      return;
    }
    var queryString = location.search.substring(1);
    if (!queryString) {
      return;
    }
    var mappedParams = {};
    for (var field in config.map) {
      mappedParams[config.map[field]] = undefined;
    }
    var unusedParams = [];
    var components = queryString.split(/[&;]/g);
    for (var i = 0; i < components.length; i++) {
      var component = components[i];
      var keyValue = component.replace(/\+/g, ' ').split('=');
      var key = decodeURIComponent(keyValue[0]);
      if (key in mappedParams) {
        mappedParams[key] = decodeURIComponent(keyValue[1] || '');
      } else {
        unusedParams.push(component);
      }
    }
    for (var field in config.map) {
      var value = mappedParams[config.map[field]];
      if (value != undefined) {
        tracker.set(field, value);
      }
    }
    var newSearch = '';
    if (unusedParams) {
      newSearch = '?' + unusedParams.join('&');
    }
    var page = location.pathname + newSearch + location.hash;
    window.history.replaceState(null, null, page);
    tracker.set('page', page);
  }

  ga('provide', 'querystring', plugin);
})();
