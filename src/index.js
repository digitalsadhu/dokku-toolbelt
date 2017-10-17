#!/usr/bin/env node
'use strict';

var dokkuGitRemoteParser = require('./dokku-git-remote-parser')
var dokkuAppSsh = require('dokku-app-ssh')
var cp = require('child_process')
var _ = require('highland')
var minimist = require('minimist');
var cleanHelpCommand = require('./clean-help-command')

var argv = minimist(process.argv.slice(2))
var host, appName = argv.app;
delete argv.app;
Object.keys(argv)
  .filter(function (arg) {
    return arg !== '_'
  })
  .forEach(function (arg) {
    argv._.push('-' + arg)
  })
var command = argv._.join(' ')

dokkuGitRemoteParser(function (err, apps) {
  if (err) {
    console.error('Dokku Toolbelt Error:', err.message)
    process.exit()
  }

  if (appName){
    var app = apps.find(function(a){ return a.appName == appName });
    host = app.host;

  } else if (apps.length>0) {
    host = apps[0].host;
    appName = apps[0].appName;
    if (apps.length>1){
      var appNames = apps.map(function(a){ return a.appName; });
      console.log('multiple apps defined ['+ appNames + '] using default: --app ' + appName + '');
    }
  }

  try {
    var sshCommand = dokkuAppSsh(host, command, appName)
  } catch (err) {
    console.error('Dokku Toolbelt Error:', err.message)
    process.exit()
  }

  //run the command
  var commandArgs = sshCommand.split(' ')
  var cmd = commandArgs.shift()
  var dt = cp.spawn(cmd, commandArgs)

  _(dt.stdout)
    .map(function (buffer) {
      return buffer.toString()
    })
    .through(function (stream) {
      if (argv._[0] === 'help' || !argv._[0])
        return cleanHelpCommand(stream)

      return stream
    })
    .pipe(process.stdout)

  dt.stderr.pipe(process.stderr)
})
