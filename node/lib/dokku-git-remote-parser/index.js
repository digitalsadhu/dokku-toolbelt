let spawn = require('child_process').spawn,
    parse = require('./lib/dokku-git-remote-stream')

module.exports = (cb) => {
  let gitRemote = spawn('git', ['remote', '-v'], { cwd: process.cwd() })

  gitRemote.stdout
    .pipe(parse)
    .on('data', data => cb(data.host, data.appName))
}
