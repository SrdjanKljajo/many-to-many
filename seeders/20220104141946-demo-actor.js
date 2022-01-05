'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'actors',
      [
        {
          name: ' Anatoliy Solonitsyn',
          slug: ' anatoliy-solonitsyn',
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          name: 'Ivan Lapikov',
          slug: 'ivan-lapikov',
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          name: 'Nikolay Grinko',
          slug: 'nikolay-grinko',
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          name: 'Keanu Reeves',
          slug: 'keanu-reeves',
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          name: 'Laurence Fishburne',
          slug: 'laurence-fishburne',
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          name: 'Carrie-Anne Moss',
          slug: 'carrie-anne-moss',
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('actors', null, {})
  },
}
