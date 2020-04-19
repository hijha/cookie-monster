'use strict';

const whitelist = document.getElementById('whitelist');
const settings = document.getElementById('settings');

whitelist.onclick = () => {
  chrome.storage.sync.get('whitelistedDomains', (data) => {
    const whitelistedDomains = data.whitelistedDomains || [];

    chrome.tabs.getSelected(null, (tab) => {
      const domain = new URL(tab.url).host.replace('www', '');
      whitelistedDomains.push(domain);
      chrome.storage.sync.set({'whitelistedDomains': whitelistedDomains}, () => {
        console.log("Domain whitelisted");
      });
    });
  });
};

settings.onclick = () => {
  chrome.tabs.create({ 'url': `chrome-extension://${chrome.runtime.id}/options.html`});
}
