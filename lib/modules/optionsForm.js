let el

const renderInputs = (options) => {
  return Object.keys(options).map((key) => {
    const option = options[key]
    return `
      <section class='form-group'>
        <label>${option.label}</label>
        <textarea class="form-control" id="optionInput${key}" placeholder="${option.placeholder || ''}"></textarea>
      </section>
    `
  }).join('')
}

const saveOptions = (options) => {
  const values = Object.keys(options).reduce((acc, key) => {
    const inputEl = el.querySelector(`#optionInput${key}`)
    if(!inputEl) return acc
    const value = (!inputEl.value || inputEl.value.length === '') ? options[key].default : inputEl.value
    acc[key] = value
    return acc
  }, {})
  chrome.storage.sync.set( values,
    () => {
      alert('saved!')
    }
  )
}

export const makeDefaultValues = (options) => {
  return Object.keys(options).reduce((acc, key) => {
    acc[key] = options[key].default || null
    return acc
  }, {})
}

const restoreOptions = (options) => {
  const defaultValues = makeDefaultValues(options)
  chrome.storage.sync.get( defaultValues,
    (savedOptions) => {
      Object.keys(options).forEach((key) => {
        const inputEl = el.querySelector(`#optionInput${key}`)
        if(!inputEl) return
        inputEl.value = savedOptions[key]
      }, {})
    }
  )
}

export const makeOptionsForm = (options, rootEl) => {
  el = rootEl
  el.innerHTML = `
    ${renderInputs(options)}
    <button id="optionFormSaveBtn" class="btn btn-primary">Save</button>
  `
  el.querySelector('#optionFormSaveBtn').addEventListener('click', () => {
    saveOptions(options)
  })
  restoreOptions(options)
}
