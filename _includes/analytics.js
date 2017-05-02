window.ga = window.ga || function() {
  (ga.q = ga.q || []).push(arguments);
};
ga.l = +new Date;

ga('create', 'UA-96975459-1', 'auto', {
  'siteSpeedSampleRate': 100,
});

window.addEventListener('error', function(event) {
  var description = event.message + " @" + event.filename + ":" + event.lineno;
  ga('send', 'exception', {
    'exDescription': description,
  });
});

window.qs = {};
var queryString = location.search.substring(1);
if (queryString) {
  var components = queryString.replace(/\+/g, ' ').split(/[&;]/g);
  for (var i = 0; i < components.length; i++) {
    var keyval = components[i].split('=');
    qs[decodeURIComponent(keyval[0])] = decodeURIComponent(keyval[1] || '');
  }
}

ga('set', 'campaignSource', qs['utm_source']);
ga('set', 'campaignMedium', qs['utm_medium']);
ga('set', 'campaignName', qs['utm_campaign']);
ga('set', 'campaignKeyword', qs['utm_term']);
ga('set', 'campaignContent', qs['utm_content']);
ga(function(tracker) {
  ga('set', 'dimension1', tracker.get('clientId'));
});
ga('set', 'dimension2', qs['utm_match']);
ga('set', 'dimension3', qs['utm_network']);
ga('set', 'dimension4', qs['utm_placement']);
ga('set', 'dimension5', qs['utm_position']);

var page = location.pathname + location.hash;
window.history.replaceState(null, null, page);
ga('set', 'page', page);
ga('send', 'pageview');
