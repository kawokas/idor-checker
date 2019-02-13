let el = null
const clearHtml = '<li class="clear-cell">No Detect IDOR</li>'
const render = (idors) => {
  const listHtml = idors.reverse().map((idor) => {
    if(!idor) return
    return `
      <li class="idor-cell idor-level-${idor.level}">
        <h2>${idor.level}</h2>
        <a class="idor-cell-description" href='${idor.url}' target="_blank">
          ${idor.url}
        </a>
        <p class="idor-cell-description">
          ${idor.description}
        </p>
      </li>
    `
  }).join('')
  const html = listHtml === '' ? clearHtml : listHtml
  el.innerHTML = html
}

const init = () => {
  el = document.querySelector('#app')
  render([])
  chrome.runtime.sendMessage({name: 'get idors'}, (idors) => {
    render(idors || [])
  })
  document.querySelector('#clear-btn').addEventListener('click', () => {
    chrome.runtime.sendMessage({name: 'clear idors'}, (idors) => {
      render(idors || [])
    })
  })
}
init()
