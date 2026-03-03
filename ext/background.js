console.log("backgroud.js loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openIndex') {
    chrome.tabs.create({ url: chrome.runtime.getURL("./index.html") });
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("./index.html") });
});
