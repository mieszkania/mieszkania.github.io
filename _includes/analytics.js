window.ga = window.ga || function() {
  (ga.q = ga.q || []).push(arguments);
};
ga.l = +new Date;
ga('create', 'UA-96975459-1', 'auto', {
  'siteSpeedSampleRate': 100,
});
ga('send', 'pageview');
window.addEventListener('error', function(event) {
  description = event.message + " @" + event.filename + ":" + event.lineno;
  ga('send', 'exception', {
    'exDescription': description,
  });
});
