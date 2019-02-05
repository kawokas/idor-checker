const log = (loggable) => {
  chrome.devtools.inspectedWindow.eval( `console.log('${loggable}')` )
}
log('dev from webpack...')

chrome.devtools.network.onRequestFinished.addListener(function(req) {
  // Displayed sample TCP connection time here
  req.getContent((content) => {
    log('content recieved')
    log(req.request.url)
    if(!content) {
      log('content is null')
      return
    }
    log(typeof content)
    const loggableContent = content.
      replace(/'/g, '\\\'').
      replace(/"/g, '`\\"').
      replace(/`/g, '\\`').
      replace(/\b/g, '\\b').
      replace(/\f/g, '\\f').
      replace(/\n/g, '\\n').
      replace(/\r/g, '\\r').
      replace(/\t/g, '\\t').
      replace(/\v/g, '\\v')
    log(loggableContent)
  })
});
