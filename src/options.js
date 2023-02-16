
document.addEventListener('DOMContentLoaded', function () {
  var blacklistDisplay = document.getElementById('blacklist');
  var addUrlForm = document.getElementById('add-url-form');
  var addUrlInput = document.getElementById('add-url-input');
  var message = document.getElementById('message');

  // Load the existing blacklist from storage and display it
  chrome.storage.local.get('blacklist', function (result) {
    var blacklist = result.blacklist || [];
    updateBlacklistDisplay(blacklist);
  });

  // Handle form submission to add a URL to the blacklist
  addUrlForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var url = addUrlInput.value.trim();
    if (url) {
      addUrlInput.value = '';
      chrome.storage.local.get('blacklist', function (result) {
        var blacklist = result.blacklist || [];
        blacklist.push(url);
        if (!url.includes("www")) {
          blacklist.push('www.' + url);
        };
        chrome.storage.local.set({ blacklist: blacklist }, function () {
          updateBlacklistDisplay(blacklist);
          showMessage('URL added to blacklist.');
        });
      });
    }
  });

  // Add click event listeners to the URL items to remove them from the blacklist
  blacklistDisplay.addEventListener('click', function (event) {
    if (event.target.classList.contains('url-item')) {
      var url = event.target.textContent;
      chrome.storage.local.get('blacklist', function (result) {
        var blacklist = result.blacklist || [];
        blacklist = blacklist.filter(function (item) {
          return item !== url;
        });
        chrome.storage.local.set({ blacklist: blacklist }, function () {
          updateBlacklistDisplay(blacklist);
          showMessage('URL removed from blacklist.');
        });
      });
    }
  });

  // Helper function to update the display of the blacklist
  function updateBlacklistDisplay(blacklist) {
    var html = '';
    for (var i = 0; i < blacklist.length; i++) {
      html += '<div class="url-item">' + blacklist[i] + '</div>';
    }
    blacklistDisplay.innerHTML = html;
  }

  // Helper function to show a message to the user
  function showMessage(text) {
    message.textContent = text;
    setTimeout(function () {
      message.textContent = '';
    }, 2000);
  }
});