#!/usr/bin/env node

var program = require('commander')
var pjson = require('./package.json')
var dokkuGitRemoteParser= require('dokku-git-remote-parser')
var dokkuAppSsh = require('dokku-app-ssh')
var cp = require('child_process')

program
  .version(pjson.version)

program.command('* [params...]')
  .action(function () {
    var args = program.rawArgs.slice(2)
    var command = args.join(' ')

    dokkuGitRemoteParser(function (err, host, appName) {
      if (err) {
        console.error('Dokku Toolbelt Error:', err.message)
        process.exit()
      }

      try {
        var sshCommand = dokkuAppSsh(host, command, appName)
      } catch (err) {
        console.error('Dokku Toolbelt Error:', err.message)
        process.exit()
      }

      //run the command
      var arguments = sshCommand.split(' ')
      var cmd = arguments.shift()

      var dt = cp.spawn(cmd, arguments)
      dt.stdout.pipe(process.stdout)
      dt.stderr.pipe(process.stderr)
    })
  })

program.parse(process.argv)
