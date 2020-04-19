const urls = [];

const clearCookies = (cookies) => {
  cookies.forEach(cookie => {
    const url = `${cookie.secure ? 'https' : 'http'}://${cookie.domain}${cookie.path}`;
    const name =  cookie.name;
    chrome.cookies.remove({url, name});
  });
}

chrome.tabs.onRemoved.addListener((tabId) => {
  const currentUrl = urls[tabId];

  chrome.storage.sync.get('whitelistedDomains', (data) => {
    const domain = new URL(currentUrl).host.replace('www', '');
    if (data.whitelistedDomains.includes(domain)) {
      console.log(`${currentUrl} found in the list of whitelistedDomains.`);
      chrome.cookies.getAll({ domain }, (cookies) => {
        console.log("Clearing cookies for domain", domain, cookies);
        clearCookies(cookies);
      });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    urls[tabId] = changeInfo.url;
  }
});
