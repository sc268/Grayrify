chrome.runtime.onInstalled.addListener(function() {
    // Set default blacklist on installation
    chrome.storage.local.set({ blacklist: ["facebook.com", "twitter.com"] });
  });