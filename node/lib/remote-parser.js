module.exports = (remoteString) => {
  var parts = remoteString.split(' ')
  var origin = parts[0]
  var user = parts[1].split('@')[0]
  var host = parts[1].split('@')[1].split(':')[0]
  var path = parts[1].split('@')[1].split(':')[1]

  return {
    origin: origin,
    user: user,
    host: host,
    path: path
  }
}
