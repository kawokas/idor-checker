export const escape = (text) => {
  return text.
    replace(/'/g, "\\'").
    replace(/"/g, '\\"').
    replace(/`/g, '\\`').
    replace(/\b/g, '\\b').
    replace(/\f/g, '\\f').
    replace(/\n/g, '\\n').
    replace(/\r/g, '\\r').
    replace(/\t/g, '\\t').
    replace(/\v/g, '\\v')
}
