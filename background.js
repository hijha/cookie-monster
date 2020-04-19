import { deleteCookies } from './utils.js';

const urls = [];

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    urls[tabId] = changeInfo.url;
  }
});

/**
 * When a tab is closed, check if it's in the list of whitelisted
 * domains.
 * Delete cookies for it if it's whitelisted.
 */
chrome.tabs.onRemoved.addListener(async (tabId) => {
  const currentUrl = urls[tabId];

  chrome.storage.sync.get('whitelistedDomains', async (data) => {
    const { whitelistedDomains = [] } = data;
    if (currentUrl) {
      const domain = new URL(currentUrl).host.replace('www', '');
      if (whitelistedDomains.includes(domain)) {
        console.log(`${currentUrl} found in the list of whitelistedDomains.`);
        deleteCookies({ domain });
      }
    }
  });
});
