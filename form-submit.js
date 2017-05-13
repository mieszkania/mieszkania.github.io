(function(){
  var buttonEnabled = {
    'empty': true,
    'pending': false,
    'success': false,
    'failure': true,
  };

  function updateButton(button, state) {
    button.disabled = !buttonEnabled[state];
    for (key in buttonEnabled) {
      button.classList.remove(key);
    }
    button.classList.add(state);
    var value = button.getAttribute('data-' + state);
    if (value) {
      button.value = value;
    }
  }

  function findForms() {
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
      var form = forms[i];
      var iframe = form.getElementsByTagName('iframe')[0];
      if (!iframe || !iframe.name) {
        continue;
      }
      var buttons = form.querySelectorAll('input[type=submit]');
      window.addEventListener('message', function(event) {
        if (event.source.name != iframe.name ||
            !(event.data in buttonEnabled)) {
          return;
        }
        for (var j = 0; j < buttons.length; j++) {
          updateButton(buttons[j], event.data);
        }
      });
      form.addEventListener('submit', function() {
        for (var j = 0; j < buttons.length; j++) {
          updateButton(buttons[j], 'pending');
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', findForms);
})();
