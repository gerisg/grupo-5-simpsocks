'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('addresses', [
      {
        street: 'Morningstar',
        number: 4484,
        city: 'Cam Lam',
        type: 'shipping',
        user_id: 2
      },
      {
        street: 'Almo',
        number: 38,
        city: 'Jandiala Sher Khan',
        type: 'payment',
        user_id: 2
      },
      {
        street: 'Sheridan',
        number: 13669,
        city: 'Kitakata',
        type: 'shipping',
        user_id: 3
      },
      {
        street: 'American',
        number: 0,
        city: 'Gribanovskiy',
        type: 'shipping',
        user_id: 4
      },
      {
        street: 'Eagle Crest',
        number: 26,
        city: 'Lajeosa do Mondego',
        type: 'payment',
        user_id: 5
      },
      {
        street: 'Morningstar',
        number: 16,
        city: '‘Asirah al Qibliyah',
        type: 'payment',
        user_id: 6
      },
      {
        street: 'Meadow Ridge',
        number: 591,
        city: 'Syracuse',
        type: 'payment',
        user_id: 7
      },
      {
        street: 'Johnson',
        number: 49,
        city: 'Philipsburg',
        type: 'payment',
        user_id: 8
      },
      {
        street: 'Towne',
        number: 5057,
        city: 'Zhangduangu',
        type: 'shipping',
        user_id: 8
      },
      {
        street: 'Derek',
        number: 5,
        city: 'Alkmaar',
        type: 'shipping',
        user_id: 9
      },
      {
        street: 'Delladonna',
        number: 19090,
        city: 'Eshan',
        type: 'payment',
        user_id: 10
      },
      {
        street: 'Blackbird',
        number: 35,
        city: 'Casisang',
        type: 'shipping',
        user_id: 11
      },
      {
        street: 'Heffernan',
        number: 8720,
        city: 'Pachir wa Agam',
        type: 'payment',
        user_id: 12
      },
      {
        street: 'Macpherson',
        number: 4,
        city: 'Tylicz',
        type: 'payment',
        user_id: 13
      },
      {
        street: 'Loomis',
        number: 676,
        city: 'Shali',
        type: 'payment',
        user_id: 13
      },
      {
        street: 'Pine View',
        number: 41,
        city: 'Olafulihaa',
        type: 'shipping',
        user_id: 14
      },
      {
        street: 'Continental',
        number: 3256,
        city: 'Tost',
        type: 'payment',
        user_id: 15
      },
      {
        street: 'New Castle',
        number: 431,
        city: 'Luodian',
        type: 'payment',
        user_id: 16
      },
      {
        street: 'Dennis',
        number: 683,
        city: 'Pelabuhanratu',
        type: 'shipping',
        user_id: 16
      },
      {
        street: 'Coleman',
        number: 49782,
        city: 'Tuopu Luke',
        type: 'payment',
        user_id: 17
      },
      {
        street: 'Old Shore',
        number: 386,
        city: 'Aguas Corrientes',
        type: 'shipping',
        user_id: 18
      },
      {
        street: 'Glacier Hill',
        number: 90,
        city: 'Phu Loc',
        type: 'shipping',
        user_id: 19
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('addresses', null, {});
  }
};