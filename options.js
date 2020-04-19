'use strict';

let domains = [];

/**
 * Display values in local storage for whitelistedDomains
 */
chrome.storage.sync.get('whitelistedDomains', (data) => {
  domains = data.whitelistedDomains || [];

  domains.forEach(domain => {
    const optionElem = document.createElement("option");
    optionElem.setAttribute("value", domain);
    const displayName = document.createTextNode(domain);
    optionElem.appendChild(displayName);
    document.getElementById("whitelistedDomains").appendChild(optionElem);
  });
});

const deleteButton = document.getElementById('deleteButton');

/**
 * Remove whitelisted domains from the local storage
 */
deleteButton.onclick = () => {
  const selectedDomain = document.getElementById('whitelistedDomains').value;
  const updatedDomains = domains.filter(domain => domain !== selectedDomain);
  chrome.storage.sync.set({ 'whitelistedDomains': updatedDomains }, () => {
    console.log("Domains updated");
    document.getElementById('deleteStatus').innerHTML = 'Updated Domains';
  });
}
