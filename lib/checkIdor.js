// type DetectedIdor = {
//   url: string,
//   line: number,
//   level: 'warn' | 'danger',
//   detectedStr: string,
// }

// @param text: String
// @return array<DetectedIdor>
const detectDanger = (text) => {

}

// @param text: String
// @return array<DetectedIdor>
const detectWarn = (text) => {

}

// @param text: String
// @return array<DetectedIdor>
export const checkIdor = (text) => {
  return [
    ...detectDanger(text),
    ...detectWarn(text),
  ]
}
