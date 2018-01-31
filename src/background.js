chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
         console.log(tab.url)

         for(var k in PREFS.siteList) {
          listedPattern = parseLocation(PREFS.siteList[k]);
          if (match(listedPattern.domain, tab.url))
          {     
             chrome.tabs.executeScript(tabId, {file: "gray.js"})            
          }
     }
  }
});


function match(suburl, url){
  return url.indexOf(suburl) >=0
}

//******************************************************
//Below codes are modified from Strict Workflow @matchu
//******************************************************
function parseLocation(location) {
  var components = location.split('/');
  return {domain: components.shift(), path: components.join('/')};
}

var PREFS = loadPrefs()

function defaultPrefs() {
  return {
    siteList: [
      'facebook.com',
      'youtube.com'
    ]
  }
}

function loadPrefs() {
  if(typeof localStorage['prefs'] !== 'undefined') {
    return updatePrefsFormat(JSON.parse(localStorage['prefs']));
  } else {
    return savePrefs(defaultPrefs());
  }
}

function updatePrefsFormat(prefs) {
  // Sometimes we need to change the format of the PREFS module. When just,
  // say, adding boolean flags with false as the default, there's no
  // compatibility issue. However, in more complicated situations, we need
  // to modify an old PREFS module's structure for compatibility.
  
  if(prefs.hasOwnProperty('domainBlacklist')) {
    // Upon adding the whitelist feature, the domainBlacklist property was
    // renamed to siteList for clarity.
    
    prefs.siteList = prefs.domainBlacklist;
    delete prefs.domainBlacklist;
    savePrefs(prefs);
    console.log("Renamed PREFS.domainBlacklist to PREFS.siteList");
  }
  
  if(!prefs.hasOwnProperty('showNotifications')) {
    // Upon adding the option to disable notifications, added the
    // showNotifications property, which defaults to true.
    prefs.showNotifications = true;
    savePrefs(prefs);
    console.log("Added PREFS.showNotifications");
  }
  
  return prefs;
}

function savePrefs(prefs) {
  localStorage['prefs'] = JSON.stringify(prefs);
  return prefs;
}

function setPrefs(prefs) {
  PREFS = savePrefs(prefs);
  loadRingIfNecessary();
  return prefs;
}

//ga
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-62548520-5']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


