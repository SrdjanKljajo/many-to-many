'use strict'
const { SequelizeSlugify } = require('sequelize-slugify')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Actor }) {
      // define association here
      this.belongsToMany(Actor, {
        foreignKey: 'movieId',
        through: 'actor_movies',
        as: 'actors',
      })
    }

    // fields to not return
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }

  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Movie must have a title' },
          len: {
            args: [2, 100],
            msg: 'Title must have 2 - 100 caracters!',
          },
        },
      },
      director: DataTypes.STRING,
      release: DataTypes.DATE,
      duration: DataTypes.INTEGER,
      slug: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'movies',
      modelName: 'Movie',
    }
  )

  SequelizeSlugify.slugifyModel(Movie, {
    source: ['title'],
    overwrite: false,
  })

  return Movie
}
