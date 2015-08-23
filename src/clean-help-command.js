let _ = require('highland')
let os = require('os')

let trim = text => text.trim()

let cleanHelpText = text => {
  if (text.match('Usage')) return text += os.EOL
  if (text.match('Options')) return text
  if (text.match('apps:create')) return text

  let columnA = text.slice(0, 60)
  let columnB = text.slice(60)

  columnA = columnA
    .replace(/<app>/gi, '')
    .replace(/\(\|--global\)/gi, '')
    .replace(/\s{2,}/gi, ' ')
  while (columnA.length < 60) {
    columnA += ' '
  }

  columnB = columnB.replace(' global or ', ' ')

  return columnA + columnB
}

let indentCommands = text => {
  if (text.match('Usage')) return text
  if (text.match('Options')) return text

  return '    ' + text
}

const blacklist = [
  'apps:destroy',
  'backup:export',
  'backup:import',
  'shell',
  'version'
]
let blacklistedHelpCommands = text => {
  for (let item of blacklist) {
    if (text.match(item)) {
      return
    }
  }
  return text
}

let joinWithNewLines = (a, b) => `${a}\n${b}`

module.exports = (stream) => {
  return stream
    .split()
    .map(trim)
    .filter(blacklistedHelpCommands)
    .map(cleanHelpText)
    .map(indentCommands)
    .reduce1(joinWithNewLines)
}
