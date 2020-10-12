# Simpsocks

## Nuestros productos 🧦

❇️ Nuestra aplicación web ofrecerá como producto **medias con diseños de los personajes de los Simpsons**, serie icónica  de la cultura pop. Una opción fresca y divertida para obsequiar algo original a bajo costo.

Diferentes alternativas para todos los gustos y necesidades: soquetes, medias 3/4 y bucaneras, con tus personajes preferidos.

### Audiencia objetivo 🧑🏻‍🤝‍🧑🏽

❇️ Nuestra audiencia objetivo serán personas de *18 a 40 años*, que sienta afición por la serie. Por tratarse de un personaje ícono de esa generación, consideramos que los gustos del público podrían ajustarse a nuestra oferta. 

Además, esta audiencia tiene la particularidad que ya conoce respecto al manejo de las tecnologías y las utiliza para concretar compras a diario.

## Nuestro equipo 👨‍💻

#### ✳️ Valeria Malbran
- Casi comunicadora social explorando el mundo IT y el diseño de productos digitales. 

#### ✳️ Gerardo Gallardo
- Programador, apasionado de la tecnología, amante del asado y el buen vino.

#### ✳️ Martin Langlois
- Hotelero intentando comprender, aprender y avanzar en el mundo IT!

## Herramientas 🛠️

- Repositorio: [GitHub](https://github.com/gerisg/grupo-5-simpsocks)
- Seguimiento: [Trello](https://trello.com/b/fNkAilQh)
- Comunicación: [Slack](https://node-a-distancia.slack.com/archives/G01644GKP8U)
- Documentos: [Google Drive](https://drive.google.com/drive/folders/1yWLYsQS5PVYocpfAcGxI1yLDRoESWm7t)
- Wireframes: [Figma](https://www.figma.com/file/wrRketOpyDSYJ0KEJyjJZb)

## Nos Inspiran 🚀

#### ✳️ [Deepside Trend](https://www.deepsidecyt.com)

> En esta página se pueden encontrar productos diversas temáticas de películas, series y animé.
La arquitectura de la información se muestra desplegada de forma sencilla. En la sección “productos” se despliega un menú contextual que facilita la búsqueda de elementos, también cuenta con un buscador accesible que facilita encontrar productos.

#### ✳️ [This Is Feliz Navidad](https://www.thisisfeliznavidad.com/)

> La tienda se orienta a la venta de indumentaria caracterizándose por el diseño y los estampados que ofrece con tendencia pop. EL filtro de búsqueda por categorías se encuentra claramente dividido a través de cards. Cuenta con un menú “burger” que facilita filtrar la búsqueda. También el buscador presente en todo momento facilita la navegación entre productos. Presenta un diseño propuesto por tiendanube. 

#### ✳️ [Libria](https://libria.com.ar/)

> Tienda online que se encarga de la venta de merchandising de Cine, Series, Comics, Videogames y más! La navegación de la página es simple, la división de categorías facilita la búsqueda, junto a un buscador que se encuentra visible en cada sección de la página. 

#### ✳️ [Dafiti](https://www.dafiti.com.ar/)

> Tienda con gran volumen de ventas, tiene una gran cantidad de productos agrupados en múltiples categorías. Posee un diseño simple y bien logrado, un buscador potente con sugerencias y filtros que facilitan la localización del producto deseado.

#### ✳️ [Todo Moda](https://ar.todomoda.com/)

> Es una tienda líder, con diseño muy atractivo y que resuelve agrupando los productos en una gran cantidad de categorías. El slide de ofertas en la página principal pareciera ser un gran acierto de marketing.

#### ✳️ [Prime Video](https://www.primevideo.com)

> Posee un diseño simple y destaca las funcionalidades disponibles para los usuarios.

#### ✳️ [Mercado Libre](https://www.mercadolibre.com.ar)

> Por tratarse de un marketplace, dispone de un abanico importante de funciones que nos sirven de ejemplo y modelo.

#### ✳️ [Vara Vara](https://www.varavara.com.ar/)

>Es una tienda de productos de cultura pop que lo tomamos como referente por compartir nuestra temática.

#### ✳️ [Fly Theme](http://ps.flytheme.net/themes/sp_market2/en/)

>Es un tema que tomaremos de referencia en relación a estética y distribución de contenido.

#### ✳️ [Roy Theme - Ayon](http://roythemes.com/demo/ayon/17/venus/)

>Es un tema que tomamos de referencia por contener una estética simple, combinado con colores llamativos.

#### ✳️ [Velanetro](https://velanetro.myshopify.com/)

>Es un tema que tomamos de referencia por contener una estética atractiva. Además, es destacable el proceso de compra y checkout.


## Instrucciones para iniciar Simpsocks con Docker Compose

1. Abrir una consola y clonar el proyecto.

    ```
    git clone https://github.com/gerisg/grupo-5-simpsocks
    ```

2. Posicionar en el directorio donde se encuentran los archivos de la aplicación.

    ```sh
    cd grupo-5-simpsocks/site
    ```

3. Renombrar el archivo .env-example a .env

4. Ejecutar el siguiente comando para iniciar los contenedores de la aplicación y base de datos.

    ```sh
    docker-compose up
    ```

5. En una nueva consola ejecuta los siguientes comandos para crear la base de datos, migrar las tablas con sus relaciones y anexar datos de prueba.

    ```sh
    docker exec -it simpsocks_dev sequelize db:create
    docker exec -it simpsocks_dev sequelize db:migrate
    docker exec -it simpsocks_dev sequelize db:seed:all
    ```
6. Abrir un browser e ingresar a [localhost:3000](localhost:3000).

    ### Credenciales

    #### Acceso Administrador:
    - Usuario: admin@mail.com
    - Contraseña: 12345678

    #### Acceso Usuario:
    - Usuario: user@mail.com
    - Contraseña: 12345678

7. Disfrutá de SimpSocks !! Y si querés reportarnos errores o solicitar nuevas funcionalidades, podés crear un ticket [acá](https://github.com/gerisg/grupo-5-simpsocks/issues/new).


## Instrucciones para iniciar Simpsocks

1. Abrir una consola y clonar el proyecto.

    ```
    git clone https://github.com/gerisg/grupo-5-simpsocks
    ```

2. Posicionar en el directorio donde se encuentran los archivos de la aplicación.

    ```sh
    cd grupo-5-simpsocks/site
    ```

3. Usamos algunas dependencias que deberás instalar para el funcionamiento de la aplicación con el siguiente comando. _Importante:_ deberás tener instalado __npm__.

    ```sh
    npm install
    ```

4. Configurar la base de datos. Deberás contar con un servicio de MySQL iniciado en tu sistema [(más info)](https://github.com/gerisg/grupo-5-simpsocks/blob/master/database/README.md) y configurar la conexión en el archivo de condiguración. Para facilitar esta tarea, renombar el archivo _/site/database/config/___config.json.example__ a _/site/database/config/___config.json__.

    ```sh
    cd database/config
    mv config.json.example config.json
    cd ../..
    ```

5. Editar el archivo de configuración que renombraron en el paso anterior y configurar las siguientes propiedades para la sección _development_:

    - _username_: nombre de usuario para conectar a MySQL, si no creaste un usuario específico podés usar "root".
    - _password_: la contraseña del usuario configurado en la propiedad anterior.
    - _database_: nombre de la base de datos para Simpsocks.
    - _host_: si estas ejecutando MySQL de forma local la configuración es "127.0.0.1".
    - _dialect_: la base de datos que utilizamos es "mysql".

    __IMPORTANTE__: _si creaste un nuevo archivo de configuración no olvides de añadir las siguientes propiedades adicionales_.

    ```json
    "define": {
        "charset": "utf8mb4",
        "collate": "utf8mb4_unicode_ci",
        "timestamps": false,
        "underscored": true
    }
    ```

6. Si la configuración es correcta ahora podemos proceder con la creación de la base de datos, creación de tablas y asociaciones y carga de datos de prueba. Para ello ejecutamos los siguientes comandos (verificar que estamos posicionados en la carpeta _site_ para la correcta ejecución).

    ```sh
    sequelize db:create
    sequelize db:migrate
    sequelize db:seed:all
    ```

7. Ahora iniciar la aplicación ejecutando el siguiente comando en la Terminal.

    ```
    npm start
    ```

8. Abrir un browser e ingresar a [localhost:3000](localhost:3000).

    ### Credenciales

    #### Acceso Administrador:
    - Usuario: admin@mail.com
    - Contraseña: 12345678

    #### Acceso Usuario:
    - Usuario: user@mail.com
    - Contraseña: 12345678

9. Disfrutá de SimpSocks !! Y si querés reportarnos errores o solicitar nuevas funcionalidades, podés crear un ticket [acá](https://github.com/gerisg/grupo-5-simpsocks/issues/new).


## Links útiles

- Patrones de diseño gratuitos: [The Pattern Library](http://thepatternlibrary.com/)
- Generador de paleta de colores: [Coolors](https://coolors.co/)
