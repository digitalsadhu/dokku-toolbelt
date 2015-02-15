dokku-toolbelt
==============

Toolbelt for dokku, similar to the heroku toolbelt

# Explanation

Dokku toolbelt essentially just proxies running the `dokku` command on servers
remotely via ssh with a little 'context aware sugar' supplied by running
`git remote -v` in the current directory and parsing out `host` and `appname`

# Installation and basic usage
```
npm install -g dokku-toolbelt

cd my-app
dt config
# => my-app has no config vars
```

Under the hood, the command would have been:

```
ssh -T dokku@my-host.me config my-app
```

# Context aware

The toolbelt knows from which directory you are in, which server and project you are working with.
It can determine this by using `git remote -v` and looking for the correct host by looking for a dokku@ username
and parsing out the project name from the part after the : character.

```
dokku dokku@my-host.me:my-awesome-project

# host -> my-host.me
# project -> my-awesome-project
```

# Usage

The following are the commands that benefit from dokku-toolbelt knowing which
app and server to run against. Other dokku commands mostly work as well.

Options:

    config                                          Display the config vars for an app
    config:get  KEY                                 Display a config value for an app
    config:set  KEY1=VALUE1 [KEY2=VALUE2 ...]       Set one or more config vars
    config:unset  KEY1 [KEY2 ...]                   Unset one or more config vars
    domains:add  DOMAIN                             Add a custom domain to app
    domains                                         List custom domains for app
    domains:clear                                   Clear all custom domains for app
    domains:remove  DOMAIN                          Remove a custom domain from app
    help                                            Print the list of commands
    logs  [-t]                                      Show the last logs for an application (-t follows)
    nginx:build-config                              (Re)builds nginx config for given app
    nginx:import-ssl                                Imports a tarball from stdin; should contain server.crt and server.key
    ps:rebuild                                      Rebuild an app
    ps:restart                                      Restart app container(s)
    ps:start                                        Start app container(s)
    ps:stop                                         Stop app container(s)
    run  <cmd>                                      Run a command in the environment of an application
    url                                             Show the first URL for an application (compatibility)
    urls                                            Show all URLs for an application
