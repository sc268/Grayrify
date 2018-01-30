/*
  Localization
*/
/*
// Localize all elements with a data-i18n="message_name" attribute
var localizedElements = document.querySelectorAll('[data-i18n]'), el, message;
for(var i = 0; i < localizedElements.length; i++) {
  el = localizedElements[i];
  message = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
  
  // Capitalize first letter if element has attribute data-i18n-caps
  if(el.hasAttribute('data-i18n-caps')) {
    message = message.charAt(0).toUpperCase() + message.substr(1);
  }
  
  el.innerHTML = message;
}
*/
/*
  Form interaction
*/

var form = document.getElementById('options-form'),
  siteListEl = document.getElementById('site-list'),
  saveSuccessfulEl = document.getElementById('save-successful'),
  background = chrome.extension.getBackgroundPage(),
  startCallbacks = {}, durationEls = {};
  

form.onsubmit = function () {
  console.log("form submitted");
  var durations = {}, duration, durationStr, durationMatch;
  
  for(var key in durationEls) {
    durationStr = durationEls[key].value;
      console.log(durationMatch);
      durations[key] = 60;
  }
  
  console.log(durations);
  
  background.setPrefs({
    siteList:           siteListEl.value.split(/\r?\n/),
  })
  saveSuccessfulEl.className = 'show';
  return false;
}

siteListEl.onfocus = formAltered;

function formAltered() {
  saveSuccessfulEl.removeAttribute('class');
  timeFormatErrorEl.removeAttribute('class');
}

siteListEl.value = background.PREFS.siteList.join("\n");

