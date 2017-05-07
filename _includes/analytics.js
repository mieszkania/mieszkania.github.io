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

ga('require', 'displayfeatures');
ga('require', 'conversions');
ga('require', 'querystring', {
  'map': {
    'campaignSource': 'utm_source',
    'campaignMedium': 'utm_medium',
    'campaignName': 'utm_campaign',
    'campaignKeyword': 'utm_term',
    'campaignContent': 'utm_content',
    'dimension2': 'utm_match',
    'dimension3': 'utm_network',
    'dimension4': 'utm_placement',
    'dimension5': 'utm_position',
  },
});
ga(function(tracker) {
  ga('set', 'dimension1', tracker.get('clientId'));
});
ga('send', 'pageview');
