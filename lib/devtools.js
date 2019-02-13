import {escape} from './modules/escape'
import {checkIdor} from './modules/checkIdor'
import {log} from './modules/devlogger'
import {makeDefaultValues} from './modules/optionsForm'
import {options} from './modules/options'
log('Enabled IDOR Checker')
let idors = []

let _customMatchers = []
let _excludePaths = []

chrome.devtools.network.onRequestFinished.addListener(function(req) {
  req.getContent((content) => {
    if(!content) return
    const url = req.request.url
    const isExcludePath = _excludePaths.map((path) => {
      if(!path || path.match(/^\s*$/)) return false
      return new RegExp(path).test(url)
    }).filter((matched) => matched)
    if( 1 <= isExcludePath.length ) return
    const text = escape(content)
    const result = checkIdor(url, text, _customMatchers)
    if(result.length <= 0) return
    // log(JSON.stringify(result))
    setDangerIcon()
    idors = idors.concat(result)
  })
});

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
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

const init = () => {
  const defaultValues = makeDefaultValues(options)
  chrome.storage.sync.get( defaultValues,
    ({matchers, excludePaths}) => {
      _customMatchers = matchers ? matchers.split('\n') : []
      _excludePaths = excludePaths ? excludePaths.split('\n') : []
    }
  )
}

init()
