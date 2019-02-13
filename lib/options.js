import {makeOptionsForm} from './modules/optionsForm'
import {options} from './modules/options'
const init = () => {
  const el = document.querySelector('#optionsForm')
  makeOptionsForm(options, el)
}
init()
