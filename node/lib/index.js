let program = require('commander'),
    ssh     = require('./dokku-ssh'),
    parser  = require('./dokku-git-remote-parser'),
    pjson   = require('../../package.json')

program
  .version(pjson.version)

program.command('* [params...]')
  .action((params) => {
    parser((host, app) => {
      ssh(host, app, params)
    })
  })

program.parse(process.argv)
