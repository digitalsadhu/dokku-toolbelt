let urlParser = require('url')

module.exports = (remoteString) => {
  let parts = remoteString.split(' ')
  
  let name = parts[0]
  let url = parts[1]
  let type = parts[2].replace('(', '').replace(')', '')

  if (!url.match(/.*:\/\/.*/g))
    url = 'ssh://' + url

  let parsedUrl = urlParser.parse(url)
  let host = parsedUrl.host
  let path = parsedUrl.pathname
  let user = null 
  let pass = null

  if (parsedUrl.auth) {
    user = parsedUrl.auth.replace(/(.*):(.*)/, '$1')
    pass = parsedUrl.auth.replace(/(.*):(.*)/, '$2')
  }

  return {
    name,
    user,
    pass,
    url,
    host,
    path,
    type
  }
}
