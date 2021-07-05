let color = '#3aa757';

const clickHandler = function(e) {
    console.log(e);
    const url = e.pageUrl;
    
    if (e.linkUrl) {
        url = e.linkUrl;
    }

    // Open the page up.
    chrome.tabs.create({'url' : url });
}

const createContextMenusCallback = function(e) {
    console.log(e);
}


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});

const bypass = chrome.contextMenus.create({
    'id': 'bypass_shortlink',
    'title': 'Bypass Shortlink',
    'contexts': ['link'],
}, createContextMenusCallback );

chrome.contextMenus.onClicked.addListener(clickHandler);
