const SHALLTY_API = 'https://shallty.kyuun.id/';
const SHALLTY_WEB = 'https://shallty.moe/';

/**
 * Update available parsers on storage.
 * 
 * @param {string} parsers 
 */
const setParsers = (parsers) => {
    chrome.storage.sync.set({
        parsers: parsers
    });
}

/**
 * Get available parsers from storage.
 * 
 * @returns {Promise<string[]>}
 */
const getParsers = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('parsers', function(result) {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }

            resolve(result.parsers)
        });
    })
}

const onStartup = async () => {
    const parsers = await fetch(SHALLTY_API + 'api/parsers').then(res => res.json());

    if (parsers.data) {
        setParsers(parsers.data);
    }
}

/**
 * Check if a parser is availbale for an url.
 * 
 * @param {string} url 
 * @returns 
 */
const shouldParseUrl = async (url) => {
    const parsers = await getParsers();

    let parserExists = false;
    
    for (let i = 0; i < parsers.length; i++) {
        const parser = parsers[i];
        
        if (url.includes(parser)) {
            parserExists = true;
            break;
        }
    }

    return parserExists
}

/**
 * 
 * @param {number} tabId 
 * @param {chrome.tabs.TabChangeInfo} changeInfo 
 * @param {chrome.tabs.Tab} tab 
 */
const onTabUpdated = async (tabId, changeInfo, tab) => {
    const shouldParse = await shouldParseUrl(tab.url)
    
    if (shouldParse && !tab.url.includes(SHALLTY_API) && !tab.url.includes(SHALLTY_WEB)) {
        chrome.tabs.update(tabId, {
            url: `${SHALLTY_WEB}?shortlink=${tab.url}&open_in_new_tab=false`
        })
    }
}

chrome.tabs.onUpdated.addListener(onTabUpdated);

chrome.runtime.onInstalled.addListener(onStartup);

chrome.runtime.onStartup.addListener(onStartup);
