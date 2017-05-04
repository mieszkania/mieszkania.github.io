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

ga('require', 'displayfeatures');
ga(function(tracker) {
  ga('set', 'dimension1', tracker.get('clientId'));
});
var fieldMap = {
  'campaignSource': 'source',
  'campaignMedium': 'medium',
  'campaignName': 'campaign',
  'campaignKeyword': 'term',
  'campaignContent': 'content',
  'dimension2': 'match',
  'dimension3': 'network',
  'dimension4': 'placement',
  'dimension5': 'position',
};
for (var field in fieldMap) {
  var utm = qs['utm_' + fieldMap[field]];
  if (!!utm) {
    ga('set', field, utm);
  }
}

var page = location.pathname + location.hash;
window.history.replaceState(null, null, page);
ga('set', 'page', page);
ga('send', 'pageview');
