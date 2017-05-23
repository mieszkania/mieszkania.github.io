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

  function bindForm(form) {
    var iframe = form.getElementsByTagName('iframe')[0];
    if (!iframe) {
      return;
    }
    var buttons = form.querySelectorAll('input[type=submit]');
    window.addEventListener('message', function(event) {
      if (event.source !== iframe.contentWindow ||
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

  function findForms() {
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
      bindForm(forms[i]);
    }
  }

  document.addEventListener('DOMContentLoaded', findForms);
})();
