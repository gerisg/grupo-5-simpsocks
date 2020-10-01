# Simpsocks Dockerized

```
$ docker-compose up -d
$ docker exec -it simpsocks_dev sequelize db:create
$ docker exec -it simpsocks_dev sequelize db:migrate
$ docker exec -it simpsocks_dev sequelize db:seed:all
```