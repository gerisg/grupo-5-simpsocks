'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: "bart cow man",
        description: "Medias de algodón. Máxima calidad.",
        discount: 0,
        price: 100
      },
      {
        name: "bart cow man azules",
        description: "Medias de algodón. Máxima calidad.",
        discount: 5,
        price: 150
      },
      {
        name: "bart grises",
        description: "Medias de algodón. Máxima calidad.",
        discount: 10,
        price: 200
      },
      {
        name: "bart homme",
        description: "Medias de algodón. Máxima calidad.",
        discount: 15,
        price: 250
      },
      {
        name: "homero burger",
        description: "Medias de algodón. Máxima calidad.",
        discount: 20,
        price: 300
      },
      {
        name: "homero dona grande",
        description: "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex.",
        discount: 25,
        price: 350
      },
      {
        name: "homero comiendo dona",
        description: "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex.",
        discount: 50,
        price: 400
      },
      {
        name: "homero kit x3",
        description: "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex.",
        discount: 0,
        price: 450
      },
      {
        name: "maggie blancas",
        description: "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex.",
        discount: 5,
        price: 500
      },
      {
        name: "todos los personajes negras",
        description: "Composicion: algodón con lycra, dibujo en poliamida, puño con elastómero. Puño de Lurex.",
        discount: 0,
        price: 100.5
      },
      {
        name: "bart cow man",
        description: "sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam",
        discount: 15,
        price: 150.5
      },
      {
        name: "homero rosquillas blancas",
        description: "consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu",
        discount: 20,
        price: 200.5
      },
      {
        name: "maggie negras",
        description: "tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum",
        discount: 25,
        price: 250.5
      },
      {
        name: "bart honda",
        description: "at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque",
        discount: 50,
        price: 300.5
      },
      {
        name: "homero rosquillas rosa",
        description: "nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis",
        discount: 0,
        price: 350.5
      },
      {
        name: "homero traje banio",
        description: "consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in",
        discount: 5,
        price: 400.5
      },
      {
        name: "homero cielo",
        description: "odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem",
        discount: 10,
        price: 450.5
      },
      {
        name: "homero sparkle",
        description: "nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis",
        discount: 15,
        price: 500.5
      },
      {
        name: "lisa saxo",
        description: "aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros",
        discount: 20,
        price: 100.5
      },
      {
        name: "homero desnudo",
        description: "nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget",
        discount: 25,
        price: 150.5
      },
      {
        name: "burns",
        description: "aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros",
        discount: 50,
        price: 200.5
      },
      {
        name: "marge paleta de colores",
        description: "at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque",
        discount: 0,
        price: 250.5
      },
      {
        name: "lisa gato",
        description: "sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam",
        discount: 5,
        price: 300.5
      },
      {
        name: "marge gato",
        description: "consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu",
        discount: 10,
        price: 350.5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
