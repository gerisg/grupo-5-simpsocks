# Simpsocks Database

Este documento cuenta con información para crear una base de datos con datos de prueba para la aplicación Simpsocks.

## Datos Técnicos

- Base de datos: MySQL
- ORM: Sequelize
- Charset: utf8mb4
- Collate: utf8mb4_unicode_ci

## Configuración manual

### Requisitos previos

1. Proyecto Simpsocks

    ```sh
    git clone https://github.com/gerisg/grupo-5-simpsocks
    cd grupo-5-simpsocks
    ```

2. Iniciar MySQL en el puerto 3306.

    - Sistema Operativo __Linux__

        ```sudo service mysql start```

    - Sistema Operativo __Windows__. Instalar XAMPP e iniciar el servicio MySQL
    
    - Docker Multiplataforma

        1. Si no tenés Docker primero seguir este [tutorial para instalar Docker](https://docs.docker.com/engine/install/) dependiendo de tu sistema operativo.

        2. Iniciar un container con la imagen de MySQL. [Más info](https://hub.docker.com/_/mysql). IMPORTANTE: si deseas mantener la base de datos cuando el container sea eliminado debes usar docker volume.

            ```sh
            docker run -p 3306:3306 --name dh-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
            ```

        3. Ingresar a la consola del container

            ```sh
            docker exec -it dh-mysql bash
            ```
        
        4. Loguear en MySQL con el usuario root. Cuando pida password colocan el configurado en MYSQL_ROOT_PASSWORD del paso 1. 

            ```sh
            mysql -u root -p
            ```

### Crear tablas y asociaciones

1. Abrir Workbench
2. Conectar con MySQL
3. En el menú _File_ seleccionar _Open SQL Script_
4. Seleccionar el archivo __structure.sql__ que se encuentra acompañando este instructivo dentro de la carpeta __grupo-5-simpsocks/database/scripts__.
5. Ejecutar todo el contenido del script.
6. Refrescar workbench y verificar que se crearon las tablas.

### Agregar datos de prueba

1. Abrir Workbench
2. Conectar con MySQL
3. En el menú _File_ seleccionar _Open SQL Script_
4. Seleccionar el archivo __data.sql__ que se encuentra acompañando este instructivo dentro de la carpeta __grupo-5-simpsocks/database/scripts__.
5. Ejecutar todo el contenido del script.
6. Refrescar workbench y verificar que se crearon registros en todas las tablas.

## (RECOMENDADO) Configuración con sequelize-cli

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

3. Iniciar _MySQL_ en el puerto _3306_.

    - Sistema Operativo __Linux__

        ```sudo service mysql start```

    - Sistema Operativo __Windows__. Instalar XAMPP e iniciar el servicio MySQL
    
    - __Docker__ Multiplataforma

        1. Si no tenés Docker primero seguir este [tutorial para instalar Docker](https://docs.docker.com/engine/install/) dependiendo de tu sistema operativo.

        2. Iniciar un container con la imagen de MySQL. [Más info](https://hub.docker.com/_/mysql). IMPORTANTE: si deseas mantener la base de datos cuando el container sea eliminado debes usar docker volume.

            ```sh
            docker run -p 3306:3306 --name dh-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
            ```

        3. Ingresar a la consola del container

            ```sh
            docker exec -it dh-mysql bash
            ```
        
        4. Loguear en MySQL con el usuario root. Cuando pida password colocar el configurado en MYSQL_ROOT_PASSWORD del paso 1. 

            ```sh
            mysql -u root -p
            ```

### Crear base de datos

1. Abrir una Consola
2. Posicionarse en la carpeta __site__.

    ```sh
    cd grupo-5-simpsocks/site
    ```

3. Ejecutar el comando de sequelize-cli para crear una base de datos

    ```sh
    sequelize db:create --charset 'utf8mb4' --collate 'utf8mb4_unicode_ci'
    ```

4. [OPCIONAL] Abrir Workbench y verificar la creación del schema con el charset y collate correctamente configurado.

### Crear tablas y asociaciones

5. Ejecutar el comando de sequelize-cli para ejecutar las migraciones que crean la base de datos y sus asociaciones.

    ```sh
    sequelize db:migrate
    ```

    Si algo no funcionó según lo esperado se puede deshacer la migración con el siguiente comando.

    ```sh
    sequelize db:migrate:undo
    sequelize db:migrate:undo:all
    ```

6. [OPCIONAL] Abrir Workbench y verificar la creación de las tablas y sus asociaciones.

### Agregar datos de prueba

7. Ejecutar el comando de sequelize-cli para ejecutar la carga de datos (seeders).

    ```sh
    sequelize db:seed:all
    ```

    Si algo no funcionó según lo esperado se puede deshacer la migración con el siguiente comando.

    ```sh
    sequelize db:migrate:undo
    sequelize db:migrate:undo:all
    ```