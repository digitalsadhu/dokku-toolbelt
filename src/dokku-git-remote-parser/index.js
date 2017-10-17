var gitRemotes = require('git-remotes')
var dokkuUrlRegExp = /dokku@([^:]*):(?:\/.*\/)?([^\s]*)/

module.exports = function dokkuGitRemoteParser(dir, cb) {
  if (typeof dir === 'function') {
    cb = dir
    dir = process.cwd()
  }

  gitRemotes(dir, function (err, remotes) {
    if (err) {
      var error = new Error('Unable to parse git remotes')
      error.stack = err.stack
      return cb(error)
    }

    var dokkuRemoteUrls = remotes
      .filter(function (gitRemote) { return gitRemote.url.match(dokkuUrlRegExp) })
      .map(function (gitRemote) {
        var gitRemoteUrlMatches = gitRemote.url.match(dokkuUrlRegExp)

        return {
          host: gitRemoteUrlMatches[1],
          appName: gitRemoteUrlMatches[2]
        }
      })


    if (dokkuRemoteUrls.length === 0) return cb(new Error('No Dokku app detected'))

    cb(null, dokkuRemoteUrls)
  })
}
