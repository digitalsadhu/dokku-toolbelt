var spawn = require('child_process').spawn,
    parse = require('./lib/dokku-git-remote-stream')

module.exports = function (cb) {
  var gitRemote = spawn('git', ['remote', '-v'], { cwd: process.cwd() })

  gitRemote.stdout
    .pipe(parse)
    .on('data', function (data) {
      cb(data.host, data.appName)
    })
}
