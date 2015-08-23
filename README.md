dokku-toolbelt
==============

Toolbelt for dokku, similar to the heroku toolbelt

## Installation
```
npm install -g dokku-toolbelt
```

## Example usage

```
cd /path/to/my/dokku/app
dt config

=====> app config vars
NODE_ENV: production
```

## Help

Running `dt help` or `dt` will output the help text information

## Explanation

Dokku toolbelt essentially just proxies running the `dokku` command on servers
remotely via ssh with a little 'context aware sugar' supplied by running
`git remote -v` in the current directory and parsing out `host` and `appname`

## Context aware

The toolbelt knows from which directory you are in, which server and project you are working with.
It can determine this by using `git remote -v` and looking for the correct host by looking for a dokku@ username
and parsing out the project name from the part after the : character.

```
dokku dokku@my-host.me:my-awesome-project

# host -> my-host.me
# project -> my-awesome-project
```
