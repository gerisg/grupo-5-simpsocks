'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        firstname: 'Admin',
        lastname: 'Simpsocks',
        email: 'admin@mail.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: 'admin.png',
        phone: '4468753008',
        role_id: 2
      },
      {
        firstname: 'User',
        lastname: 'Simpsocks',
        email: 'user@mail.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: 'user.png',
        phone: '3992844638',
        role_id: 1
      },
      {
        firstname: 'Garvy',
        lastname: 'Newstead',
        email: 'gnewstead2@salon.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '6988461120',
        role_id: 1
      },
      {
        firstname: 'Melvin',
        lastname: 'Langfield',
        email: 'mlangfield3@wix.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '9085412344',
        role_id: 1
      },
      {
        firstname: 'Garwin',
        lastname: 'Piatti',
        email: 'gpiatti4@boston.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '6956013650',
        role_id: 1
      },
      {
        firstname: 'Andeee',
        lastname: 'Gobeau',
        email: 'agobeau5@mozilla.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '4131135090',
        role_id: 1
      },
      {
        firstname: 'Netty',
        lastname: 'Steers',
        email: 'nsteers6@youku.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '7076047975',
        role_id: 1
      },
      {
        firstname: 'Graehme',
        lastname: 'Ertel',
        email: 'gertel7@istockphoto.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '5683063901',
        role_id: 1
      },
      {
        firstname: 'Brandtr',
        lastname: 'Bauldry',
        email: 'bbauldry8@elegantthemes.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '6438474104',
        role_id: 1
      },
      {
        firstname: 'Reinhard',
        lastname: 'Huxley',
        email: 'rhuxley9@si.edu',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '5113343597',
        role_id: 1
      },
      {
        firstname: 'Roi',
        lastname: 'Kenwell',
        email: 'rkenwella@nytimes.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '8942222435',
        role_id: 1
      },
      {
        firstname: 'Normy',
        lastname: 'Wane',
        email: 'nwaneb@posterous.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: null,
        role_id: 1
      },
      {
        firstname: 'Lucian',
        lastname: 'O Connell',
        email: 'loconnellc@spiegel.de',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '1053312606',
        role_id: 1
      },
      {
        firstname: 'Tresa',
        lastname: 'Fanshawe',
        email: 'tfanshawed@rambler.ru',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: null,
        role_id: 1
      },
      {
        firstname: 'Carmine',
        lastname: 'Heathfield',
        email: 'cheathfielde@ocn.ne.jp',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: null,
        role_id: 1
      },
      {
        firstname: 'Brad',
        lastname: 'Bynert',
        email: 'bbynertf@flickr.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '6273192724',
        role_id: 1
      },
      {
        firstname: 'Esma',
        lastname: 'Storcke',
        email: 'estorckeg@aboutads.info',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '6782540554',
        role_id: 1
      },
      {
        firstname: 'Saba',
        lastname: 'Sattin',
        email: 'ssattinh@mashable.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '6297018266',
        role_id: 1
      },
      {
        firstname: 'Halsey',
        lastname: 'Scheu',
        email: 'hscheui@engadget.com',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '5963180719',
        role_id: 1
      },
      {
        firstname: 'Alexa',
        lastname: 'Skeermer',
        email: 'askeermerj@ustream.tv',
        password: '$2a$10$hhvZDtpcjxDoaDRLiMnoEeBJsOT.sVgEGRcE0kTDMFzLuwGR750Xq',
        image: null,
        phone: '9066547659',
        role_id: 1
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
