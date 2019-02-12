import {log} from './logger'
import matchRecursive from 'match-recursive'

// type DetectedIdor = {
//   url: string,
//   line: number,
//   level: 'warn' | 'danger',
//   detectedStr: string,
// }

// @param text: String
// @return array<DetectedIdor>
const detectDanger = (url, text) => {
  const matches = matchRecursive(text, '{...}')

  return matches.map((json) => {
    const idors = json.match(/(pass|salt|mail|address|credit|crypt)/g)
    if(!idors) return
    return idors.map((idor) => ({
      level: 'danger',
      description: `detect "${idor}" in response json`,
      url
    }))
  }).flat().filter((e) => !!e)
}

// @param text: String
// @return array<DetectedIdor>
const detectWarn = (url, text) => {
  url, text
  // FIXME: 実装
  return []
}

// @param text: String
// @return array<DetectedIdor>
export const checkIdor = (url, text) => {
  return [
    ...detectDanger(url, text, log),
    ...detectWarn(url, text, log),
  ]
}
