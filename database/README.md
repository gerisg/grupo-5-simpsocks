# Simpsocks Database

Este documento cuenta con información para crear una base de datos de prueba para la aplicación Simpsocks.

## Datos Técnicos

- Base de datos: MySQL
- ORM: Sequelize
- Charset: utf8mb4
- Collate: utf8mb4_unicode_ci

## Configuración con sequelize-cli

### Requisitos previos

1. Proyecto _Simpsocks_

    ```sh
    git clone https://github.com/gerisg/grupo-5-simpsocks
    cd grupo-5-simpsocks
    ```

2. Instalar _sequelize-cli_

    ```sh
    npm i sequelize-cli -g
    ```

3. Iniciar _MySQL_ en el puerto _3306_. Dependiendo de la plataforma que utiliza el procedimiento es ligeramaente diferente.

    - __Linux__: iniciar el servicio de MySQL que por lo general ya viene instalado: ```sudo service mysql start```

    - __Windows__: instalar XAMPP e iniciar el servicio MySQL.
    
    - __Docker__: opción recomendada porque sólo requiere docker instalado, el resto se instala y ejecuta dentro del contenedor.

        1. Si no tenés Docker primero seguir este [tutorial para instalar Docker](https://docs.docker.com/engine/install/) dependiendo de tu sistema operativo.

        2. Iniciar un container con la imagen de MySQL. [Más info](https://hub.docker.com/_/mysql). Recordar el password del usuario root para luego configurarlo en Sequelize.IMPORTANTE: si deseas mantener la base de datos cuando el container sea eliminado debes usar docker volume.

            ```sh
            docker run -p 3306:3306 --name dh-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
            ```

        3. Verificar que se encuentra funcionando correctamente iniciando sessión en MySQL ejecutando el siguiente comando e ingresando la contraseña previamente configurada cuando lo solicite.

            ```sh
            docker exec -it dh-mysql mysql -u root -p
            ```

### Crear base de datos

1. Abrir una Consola

2. Posicionarse en la carpeta __site__.

    ```sh
    cd grupo-5-simpsocks/site
    ```

3. Ejecutar el comando de sequelize-cli para crear una base de datos

    ```sh
    sequelize db:create
    ```

### Crear tablas y asociaciones

4. Ejecutar el comando de sequelize-cli para ejecutar las migraciones que crean la base de datos y sus asociaciones.

    ```sh
    sequelize db:migrate
    ```

    Si algo no funcionó según lo esperado se puede deshacer la migración con el siguiente comando.

    ```sh
    sequelize db:migrate:undo
    sequelize db:migrate:undo:all
    ```

### Agregar datos de prueba

5. Ejecutar el comando de sequelize-cli para ejecutar la carga de datos (seeders).

    ```sh
    sequelize db:seed:all
    ```

    Si algo no funcionó según lo esperado se puede deshacer la migración con el siguiente comando.

    ```sh
    sequelize db:migrate:undo
    sequelize db:migrate:undo:all
    ```