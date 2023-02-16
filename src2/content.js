// Retrieve blacklist from local storage and apply grayscale to matching domains
chrome.storage.local.get("blacklist", function(result) {
  var blacklist = result.blacklist;
  var hostname = window.location.hostname;

  if (blacklist && blacklist.includes(hostname)) {
    document.documentElement.style.filter = "grayscale(100%)";
  }
});