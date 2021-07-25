const SHALLTY_WEB = 'https://shallty.moe/';

const clickHandler = function(e) {
    let url = e.pageUrl;
    
    if (e.linkUrl) {
        url = e.linkUrl;
    }
    
    chrome.tabs.create({'url' : `${SHALLTY_WEB}?shortlink=${encodeURIComponent(url)}&open_in_new_tab=false` });
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
