let program = require('commander'),
    loader  = require('./command-loader'),
    pjson   = require('../../package.json')

program
  .version(pjson.version)

program.command('* [params...]')
  .action(params => loader(params))

program.parse(process.argv)
