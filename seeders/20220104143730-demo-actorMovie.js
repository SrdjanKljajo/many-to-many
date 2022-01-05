'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'actor_movies',
      [
        {
          actorId: 1,
          movieId: 1,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          actorId: 2,
          movieId: 1,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          actorId: 3,
          movieId: 1,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          actorId: 4,
          movieId: 2,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          actorId: 5,
          movieId: 2,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          actorId: 6,
          movieId: 2,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          actorId: 4,
          movieId: 3,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          actorId: 5,
          movieId: 3,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
        {
          actorId: 6,
          movieId: 3,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('actor_movies', null, {})
  },
}
