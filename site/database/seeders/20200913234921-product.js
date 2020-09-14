'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        "name": "medias bart cow man",
        "description": "Medias de algodón. Máxima calidad."
      },
      {
        "name": "medias bart cow man azules",
        "description": "Medias de algodón. Máxima calidad."
      },
      {
        "name": "medias bart grises",
        "description": "Medias de algodón. Máxima calidad."
      },
      {
        "name": "medias bart homme",
        "description": "Medias de algodón. Máxima calidad."
      },
      {
        "name": "medias homero burger",
        "description": "Medias de algodón. Máxima calidad."
      },
      {
        "name": "medias homero dona grande",
        "description": "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex."
      },
      {
        "name": "medias homero comiendo dona",
        "description": "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex."
      },
      {
        "name": "medias homero kit x3",
        "description": "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex."
      },
      {
        "name": "medias maggie blancas",
        "description": "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex."
      },
      {
        "name": "medias todos los personajes negras",
        "description": "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex."
      },
      {
        "name": "soquetes bart cow man",
        "description": "sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam"
      },
      {
        "name": "medias homero rosquillas blancas",
        "description": "consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu"
      },
      {
        "name": "bucaneras maggie negras",
        "description": "tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum"
      },
      {
        "name": "soquetes bart honda",
        "description": "at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque"
      },
      {
        "name": "medias homero rosquillas rosa",
        "description": "nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis"
      },
      {
        "name": "soquetes homero traje banio",
        "description": "consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in"
      },
      {
        "name": "soquetes homero cielo",
        "description": "odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem"
      },
      {
        "name": "medias homero sparkle",
        "description": "nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis"
      },
      {
        "name": "soquetes lisa saxo",
        "description": "aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros"
      },
      {
        "name": "soquetes homero desnudo",
        "description": "nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget"
      },
      {
        "name": "medias burns",
        "description": "aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros"
      },
      {
        "name": "medias marge paleta de colores",
        "description": "at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque"
      },
      {
        "name": "bucaneras lisa gato",
        "description": "sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam"
      },
      {
        "name": "bucaneras marge gato",
        "description": "consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
