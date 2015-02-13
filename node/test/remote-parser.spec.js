var expect = require('expect')
var parser = require('../lib/remote-parser')

describe('parsing a remote string', () => {
  Given(() => root.str = 'dokku dokku@my-host.me:my-app-name')
  When(() => root.result = parser(root.str))
  Then(() => expect(root.result.origin).toEqual('dokku'))
  And(() => expect(root.result.user).toEqual('dokku'))
  And(() => expect(root.result.host).toEqual('my-host.me'))
  And(() => expect(root.result.path).toEqual('my-app-name'))
})
