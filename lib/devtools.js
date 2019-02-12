import {escape} from './escape'
import {checkIdor} from './checkIdor'
import {log} from './logger'
log('Enabled IDOR Checker')
let idors = []
chrome.devtools.network.onRequestFinished.addListener(function(req) {
  req.getContent((content) => {
    const url = req.request.url
    if(!content) {
      return
    }
    const text = escape(content)
    const result = checkIdor(url, text, log)
    if(result.length <= 0) return
    log(JSON.stringify(result))
    setDangerIcon()
    idors = idors.concat(result)
  })
});

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    log('get message!')
    if(request.name === 'get idors') {
      sendResponse(idors)
    }
    if(request.name === 'clear idors') {
      idors = []
      setNormalIcon()
      sendResponse(idors)
    }
  }
)

const setDangerIcon = () => {
  chrome.browserAction.setIcon({
    path: {
      '16': 'icons/icon-red-16.png',
      '48': 'icons/icon-red-48.png',
      '128': 'icons/icon-red-128.png'
    }
  })
}

const setNormalIcon = () => {
  chrome.browserAction.setIcon({
    path: {
      '16': 'icons/icon-16.png',
      '48': 'icons/icon-48.png',
      '128': 'icons/icon-128.png'
    }
  })
}
