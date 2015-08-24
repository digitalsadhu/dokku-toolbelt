var _ = require('highland')
var os = require('os')

var trim = function (text) {
  return text.trim()
}

var cleanHelpText = function (text) {
  if (text.match('Usage')) return text += os.EOL
  if (text.match('Options')) return text
  if (text.match('apps:create')) return text

  var columnA = text.slice(0, 60)
  var columnB = text.slice(60)

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

var indentCommands = function (text) {
  if (text.match('Usage')) return text
  if (text.match('Options')) return text

  return '    ' + text
}

var blacklist = [
  'apps:destroy',
  'backup:export',
  'backup:import',
  'shell',
  'version',
  'ps '
]
var blacklistedHelpCommands = function (text) {
  for (var item of blacklist) {
    if (text.match(item)) {
      return
    }
  }
  return text
}

var joinWithNewLines = function (a, b) {
  return a + '\n' + b
}

module.exports = function (stream) {
  return stream
    .split()
    .map(trim)
    .filter(blacklistedHelpCommands)
    .map(cleanHelpText)
    .map(indentCommands)
    .reduce1(joinWithNewLines)
}
