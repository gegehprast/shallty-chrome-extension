const clickHandler = function(e) {
    console.log(e);
    let url = e.pageUrl;
    
    if (e.linkUrl) {
        url = e.linkUrl;
    }

    // Open the page up.
    chrome.tabs.create({'url' : url });
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
