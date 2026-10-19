// Background Service Worker (MV3 Event-Driven)
console.log('[AI Media Automator] Service Worker initialized');

chrome.runtime.onInstalled.addListener(() => {
  console.log('[AI Media Automator] Extension installed/updated');
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.sidePanel.open({ tabId: tab.id });
  }
});
