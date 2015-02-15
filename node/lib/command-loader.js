let spawn = require('child_process').spawn,
    ssh   = require('./dokku-ssh'),
    parse = require('./dokku-git-remote-stream')

module.exports = (params) => {
  let gitRemote = spawn('git', ['remote', '-v'])

  gitRemote.stdout
    .pipe(parse)
    .on('data', data => ssh(data.host, data.appName, params))
}
