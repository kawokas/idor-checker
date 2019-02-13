// import {log} from './devlogger'
import matchRecursive from 'match-recursive'

// type DetectedIdor = {
//   url: string,
//   line: number,
//   level: 'warn' | 'danger',
//   detectedStr: string,
// }

// @param text: String
// @return array<DetectedIdor>
const detectDanger = (url, text, customMatchers) => {
  const matches = matchRecursive(text, '{...}')
  return matches.map((json) => {
    const matchers = ['(token|pass|salt|mail|address|credit|crypt)', ...customMatchers]
    const idors = matchers.map((matcher) => {
      if(!matcher || matcher.match(/^\s*$/)) return false
      return json.match(new RegExp(matcher), 'g')
    }).flat()
    if(!idors) return

    return idors.map((idor) => {
      if( ! idor ) return
      return {
        level: 'danger',
        description: `detect "${idor}" in response json`,
        url
      }
    })
  }).flat().filter((e) => !!e)
}

// @param text: String
// @return array<DetectedIdor>
const detectWarn = (url, text, customMatchers) => {
  url, text, customMatchers
  // FIXME: 実装
  return []
}

// @param text: String
// @return array<DetectedIdor>
export const checkIdor = (url, text, customMatchers) => {
  return [
    ...detectDanger(url, text, customMatchers),
    ...detectWarn(url, text, customMatchers),
  ]
}
