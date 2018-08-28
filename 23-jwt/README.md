```
$ npm install -g sequelize-cli
$ sequelize init:config
$ sequelize migration:generate --name userId
```

```
$ sequelize db:migrate --env development
$ sequelize db:migrate:undo --env development
```

```
$ sequelize db:migrate:undo 20180625162655-userId --env development
```
