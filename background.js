function openPage() {
  browser.tabs.create({
    url: "https://aternos.org/"
  });
  }
  
  browser.browserAction.onClicked.addListener(openPage);

