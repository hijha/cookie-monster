'use strict';

const forceClear = document.getElementById('forceClear');
const whitelist = document.getElementById('whitelist');
const settings = document.getElementById('settings');

const clearCookies = (cookies) => {
  cookies.forEach(cookie => {
    const url = `${cookie.secure ? 'https' : 'http'}://${cookie.domain}${cookie.path}`;
    const name =  cookie.name;
    chrome.cookies.remove({url, name});
  });
}

forceClear.onclick = () => {
  chrome.tabs.getSelected(null, (tab) => {
    const domain = new URL(tab.url).host.replace('www', '');
    chrome.cookies.getAll({ domain }, (cookies) => {
      console.log("Clearing cookies for domain", domain, cookies);
      clearCookies(cookies);
    });
  });
}

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
