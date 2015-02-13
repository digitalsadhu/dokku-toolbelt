module.exports = (remoteString) => {
  var parts = remoteString.split(' ')
  var name = parts[0]
  var remoteParts = parts[1].split('@')
  var url = remoteParts[1]
  var user = remoteParts[0]
  var host = url.split(':')[0]
  var path = url.split(':')[1]
  var type = parts[2].replace('(', '').replace(')', '')

  return {
    origin: name,
    user: user,
    host: host,
    path: path,
    type: type
  }
}
