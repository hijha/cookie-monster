'use strict';

let urls = [];

chrome.storage.sync.get('whitelistedUrls', (data) => {
  urls = data.whitelistedUrls;

  urls.forEach(url => {
    const optionElem = document.createElement("option");
    optionElem.setAttribute("value", url);
    const displayName = document.createTextNode(url);
    optionElem.appendChild(displayName);
    document.getElementById("whitelistedUrls").appendChild(optionElem);
  });
});

const deleteButton = document.getElementById('deleteButton');

deleteButton.onclick = () => {
  const selectedUrl = document.getElementById('whitelistedUrls').value;
  chrome.storage.sync.get('whitelistedUrls', (data) => {
    const updatedUrls = urls.filter(url => url !== selectedUrl);
    chrome.storage.sync.set({'whitelistedUrls': updatedUrls}, () => {
      console.log("URLs updated");
      document.getElementById('deleteStatus').innerHTML = 'Updated URLs';
    });
  });
}
