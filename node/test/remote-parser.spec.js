var expect = require('expect')
var parser = require('../lib/remote-parser')

describe('parsing a git remote string', () => {
  Given(() => root.str = 'dokku dokku@my-host.me:my-app-name (fetch)')
  When(() => root.result = parser(root.str))
  Then(() => expect(root.result.name).toEqual('dokku'))
  And(() => expect(root.result.user).toEqual('dokku'))
  And(() => expect(root.result.host).toEqual('my-host.me'))
  And(() => expect(root.result.path).toEqual('/:my-app-name'))
  And(() => expect(root.result.type).toEqual('fetch'))
})

describe('parsing a second git remote string', () => {
  Given(() => root.str = 'origin https://github.com/schacon/ticgit (push)')
  When(() => root.result = parser(root.str))
  Then(() => expect(root.result.name).toEqual('origin'))
  And(() => expect(root.result.user).toEqual(null))
  And(() => expect(root.result.host).toEqual('github.com'))
  And(() => expect(root.result.path).toEqual('/schacon/ticgit'))
  And(() => expect(root.result.type).toEqual('push'))
})

describe('parsing a third git remote string', () => {
  Given(() => root.str = 'origin http://user:pass@github.com/schacon/ticgit (push)')
  When(() => root.result = parser(root.str))
  Then(() => expect(root.result.user).toEqual('user'))
  Then(() => expect(root.result.pass).toEqual('pass'))
})



