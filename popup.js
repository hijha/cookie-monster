'use strict';

const whitelist = document.getElementById('whitelist');
const settings = document.getElementById('settings');

whitelist.onclick = () => {
  let whitelistedUrls = [];

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

settings.onclick = () => {
  chrome.tabs.create({ 'url': `chrome-extension://${chrome.runtime.id}/options.html`});
}
