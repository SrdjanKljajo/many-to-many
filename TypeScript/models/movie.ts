import { Model } from 'sequelize'
const { SequelizeSlugify } = require('sequelize-slugify')

interface MovieAttributes {
  id: number
  title: string
  slug: string
  director: string
  release: Date
  duration: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Movie extends Model<MovieAttributes> implements MovieAttributes {
    id!: number
    title!: string
    slug!: string
    director!: string
    release!: Date
    duration!: number

    static associate(models: any) {
      Movie.belongsToMany(models.Actor, {
        foreignKey: 'movieId',
        through: 'actor_movies',
      })
    }
  }
  Movie.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Movie must have a title' },
          len: {
            args: [2, 100],
            msg: 'Title must have 2 - 100 caracters.',
          },
        },
      },
      director: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Movie must have a director' },
          len: {
            args: [2, 100],
            msg: 'Director name must have 2 - 50 caracters.',
          },
        },
      },
      release: DataTypes.DATE,
      duration: DataTypes.INTEGER,
      slug: {
        type: DataTypes.STRING,
        unique: true,
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
