let spawn = require('child_process').spawn,
    util  = require('util')

const globalCommands = [
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

module.exports = (host, app, params) => {
  let sshParams = ['-T', 'dokku@' + host]

  if (util.isArray(params)) {
    sshParams.push(params.shift())

    if (globalCommands.indexOf(sshParams[sshParams.length - 1]) === -1)
      sshParams.push(app)

    sshParams = sshParams.concat(params)
  }

  let ssh = spawn('ssh', sshParams)
  ssh.stdout.on('data', data => console.log(data.toString()))
  ssh.stderr.on('data', data => console.log('err:', data.toString()))
}
