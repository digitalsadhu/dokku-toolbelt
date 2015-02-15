var spawn = require('child_process').spawn,
    util  = require('util')

var globalCommands = [
  'apps:create',
  'apps:destroy',
  'backup:export',
  'backup:import',
  'plugins-install',
  'plugins',
  'plugins-update',
  'ps:rebuildall',
  'ps:restartall',
  'version',
  'help',
  'apps'
]

module.exports = function (host, app, params) {
  var sshParams = ['-T', 'dokku@' + host]

  if (util.isArray(params)) {
    sshParams.push(params.shift())

    if (globalCommands.indexOf(sshParams[sshParams.length - 1]) === -1)
      sshParams.push(app)

    sshParams = sshParams.concat(params)
  }

  var ssh = spawn('ssh', sshParams)
  ssh.stdout.on('data', function (data) {
    console.log(data.toString())
  })
  ssh.stderr.on('data', function (data) {
    console.log('err:', data.toString())
  })
}
