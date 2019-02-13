export const log = (loggable) => {
  chrome.devtools.inspectedWindow.eval( `console.log('${loggable}')` )
}
