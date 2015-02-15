let through2 = require('through2')

module.exports = through2.obj(function(chunk, enc, cb) {
  let remotes = chunk.toString().match(/dokku@([^:]*):(?:\/.*\/)?([^\s]*)/)
  let host = remotes[1]
  let appName = remotes[2]

  this.push({ host, appName })
  cb()
})
