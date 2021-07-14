chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});

const SHALLTY_WEB = 'https://shallty.moe/';

const clickHandler = function(e) {
    let url = e.pageUrl;
    
    if (e.linkUrl) {
        url = e.linkUrl;
    }
    
    chrome.tabs.create({'url' : `${SHALLTY_WEB}?shortlink=${url}` });
}

const createContextMenusCallback = function(e) {
    console.log(e);
}

const bypass = chrome.contextMenus.create({
    'id': 'bypass_shortlink',
    'title': 'Bypass Shortlink',
    'contexts': ['link'],
}, createContextMenusCallback );

chrome.contextMenus.onClicked.addListener(clickHandler);
