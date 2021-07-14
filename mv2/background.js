const SHALLTY_WEB = 'https://shallty.moe/';

/**
 * 
 * @param {number} tabId 
 * @param {chrome.tabs.TabChangeInfo} changeInfo 
 * @param {chrome.tabs.Tab} tab 
 */
const onTabUpdated = (tabId, changeInfo, tab) => {
    if (tab.url.includes('teknoku.') && !tab.url.includes(SHALLTY_WEB)) {
        chrome.tabs.update(tabId, {
            url: `${SHALLTY_WEB}?shortlink=${tab.url}`
        })
    }
}

chrome.tabs.onUpdated.addListener(onTabUpdated)
