'use strict';

let domains = [];

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

deleteButton.onclick = () => {
  const selectedDomain = document.getElementById('whitelistedDomains').value;
  chrome.storage.sync.get('whitelistedDomains', (data) => {
    const updatedDomains = domains.filter(domain => domain !== selectedDomain);
    chrome.storage.sync.set({'whitelistedDomains': updatedDomains}, () => {
      console.log("Domains updated");
      document.getElementById('deleteStatus').innerHTML = 'Updated Domains';
    });
  });
}
