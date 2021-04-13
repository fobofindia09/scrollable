/* global chrome */
chrome.runtime.onMessage.addListener(function (message) {
  switch (message.action) {
    case "openOptionsPage":
      openOptionsPage();
      break;
    case "openSupportPage":
      openSupportPage();
      break;
    default:
      break;
  }
});

function openOptionsPage() {
  chrome.runtime.openOptionsPage();
}

function openSupportPage() {
  const supportPageUrl = "https://www.patreon.com/shahman";
  chrome.tabs.create({ url: supportPageUrl });
}
