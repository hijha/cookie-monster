'use strict';

import { deleteCookies } from './utils.js';

const forceClear = document.getElementById('forceClear');
const whitelist = document.getElementById('whitelist');
const settings = document.getElementById('settings');

/**
 * Force clear cookies for the current domain.
 */
forceClear.onclick = () => {
  chrome.tabs.getSelected(null, async (tab) => {
    const domain = new URL(tab.url).host.replace('www', '');
    deleteCookies({ domain });
    document.getElementById('status').innerHTML = 'Cookies cleared';
  });
}

/**
 * Add the current domain to a list of whitelisted ones, which
 * will be then used to clear cookies when a tab is closed.
 */
whitelist.onclick = () => {
  chrome.storage.sync.get('whitelistedDomains', (data) => {
    const { whitelistedDomains = [] } = data;

    chrome.tabs.getSelected(null, (tab) => {
      const domain = new URL(tab.url).host.replace('www', '');
      whitelistedDomains.push(domain);
      chrome.storage.sync.set({'whitelistedDomains': whitelistedDomains}, () => {
        console.log("Domain whitelisted");
        document.getElementById('status').innerHTML = 'Whitelisted';
      });
    });
  });
};

settings.onclick = () => {
  chrome.tabs.create({ 'url': `chrome-extension://${chrome.runtime.id}/options.html`});
}
