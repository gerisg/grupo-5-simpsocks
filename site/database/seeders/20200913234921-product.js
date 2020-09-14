'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        "name": "medias bart cow man",
        "description": "Medias de algodón. Máxima calidad.",
        "discount": 0
      },
      {
        "name": "medias bart cow man azules",
        "description": "Medias de algodón. Máxima calidad.",
        "discount": 5
      },
      {
        "name": "medias bart grises",
        "description": "Medias de algodón. Máxima calidad.",
        "discount": 10
      },
      {
        "name": "medias bart homme",
        "description": "Medias de algodón. Máxima calidad.",
        "discount": 15
      },
      {
        "name": "medias homero burger",
        "description": "Medias de algodón. Máxima calidad.",
        "discount": 20
      },
      {
        "name": "medias homero dona grande",
        "description": "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex.",
        "discount": 25
      },
      {
        "name": "medias homero comiendo dona",
        "description": "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex.",
        "discount": 50
      },
      {
        "name": "medias homero kit x3",
        "description": "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex.",
        "discount": 0
      },
      {
        "name": "medias maggie blancas",
        "description": "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex.",
        "discount": 5
      },
      {
        "name": "medias todos los personajes negras",
        "description": "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex.",
        "discount": 0
      },
      {
        "name": "soquetes bart cow man",
        "description": "sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam",
        "discount": 15
      },
      {
        "name": "medias homero rosquillas blancas",
        "description": "consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu",
        "discount": 20
      },
      {
        "name": "bucaneras maggie negras",
        "description": "tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum",
        "discount": 25
      },
      {
        "name": "soquetes bart honda",
        "description": "at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque",
        "discount": 50
      },
      {
        "name": "medias homero rosquillas rosa",
        "description": "nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis",
        "discount": 0
      },
      {
        "name": "soquetes homero traje banio",
        "description": "consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in",
        "discount": 5
      },
      {
        "name": "soquetes homero cielo",
        "description": "odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem",
        "discount": 10
      },
      {
        "name": "medias homero sparkle",
        "description": "nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis",
        "discount": 15
      },
      {
        "name": "soquetes lisa saxo",
        "description": "aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros",
        "discount": 20
      },
      {
        "name": "soquetes homero desnudo",
        "description": "nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget",
        "discount": 25
      },
      {
        "name": "medias burns",
        "description": "aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros",
        "discount": 50
      },
      {
        "name": "medias marge paleta de colores",
        "description": "at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque",
        "discount": 0
      },
      {
        "name": "bucaneras lisa gato",
        "description": "sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam",
        "discount": 5
      },
      {
        "name": "bucaneras marge gato",
        "description": "consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu",
        "discount": 10
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
