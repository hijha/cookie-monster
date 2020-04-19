'use strict';

let whitelist = document.getElementById('whitelist');

whitelist.onclick = () => {
  const whitelistedUrls = [];

  chrome.storage.sync.get('whitelistedUrls', (data) => {
    whitelistedUrls = data.whitelistedUrls;
  });
 
  chrome.tabs.getSelected(null, (tab) => {
    const tabUrl = tab.url;
    whitelistedUrls.push(tabUrl);
    chrome.storage.sync.set({'whitelistedUrls': whitelistedUrls}, () => {
      console.log("URL whitelisted");
    });
  });
};