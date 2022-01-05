'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'movies',
      [
        {
          title: ' Andrei Rublev',
          slug: ' andrei-rublev',
          director: ' Andrei Tarkovsky',
          release: '1966-11-23T13:00:38.885Z',
          duration: 205,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          title: 'The Matrix Revolutions',
          slug: 'the-matrix-revolutions',
          director: 'Lana Wachowski',
          release: '2003-10-23T13:00:38.885Z',
          duration: 129,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          title: 'The Matrix Reloaded',
          slug: 'the-matrix-reloaded',
          director: 'Lana Wachowski',
          release: '1977-11-23T13:00:38.885Z',
          duration: 138,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('movies', null, {})
  },
}
