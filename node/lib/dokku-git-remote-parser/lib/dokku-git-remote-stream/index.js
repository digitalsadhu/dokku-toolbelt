var through2 = require('through2')

module.exports = through2.obj(function(chunk, enc, cb) {
  var remotes = chunk.toString().match(/dokku@([^:]*):(?:\/.*\/)?([^\s]*)/)
  var host = remotes[1]
  var appName = remotes[2]

  this.push({ host: host, appName: appName })
  cb()
})
