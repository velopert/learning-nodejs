```
CREATE DATABASE tutorial;
GRANT ALL PRIVILEGES ON tutorial.* to myuser@'%' IDENTIFIED BY 'mypass';
GRANT ALL PRIVILEGES ON tutorial.* to myuser@'localhost' IDENTIFIED BY 'mypass';
```

```
$ mysql -umyuser -pmypass
```

```
USE tutorial;
SHOW tables;
SHOW COLUMNS FROM posts;
```
