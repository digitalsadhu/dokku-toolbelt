# dokku-toolbelt
Toolbelt for dokku, similar to the heroku toolbelt

# Goals

Produce a heroku like toolbelt for dokku that is context aware and can easily be installed via 
popular package managers.

Example:
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

Ideally the toolbelt should know from which directory you are in, which server and project you are working with.
It can determine this by using `git remote -v` and looking for the correct host by looking for a dokku@ username
and parsing out the project name from the part after the : character.

```
dokku dokku@my-host.me:my-awesome-project

# host -> my-host.me
# project -> my-awesome-project
```

There may be quite a few edge cases to handle with this approach but this initial naive approach should work
in a large majority of cases.

# Platforms

I would like to see an implementation on several popular package managers. I will personally be focusing on
an implementation in node published to npm as that is the platform I am most familiar with.
