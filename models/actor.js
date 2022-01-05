'use strict'
const { SequelizeSlugify } = require('sequelize-slugify')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie }) {
      // define association here
      this.belongsToMany(Movie, {
        foreignKey: 'actorId',
        through: 'actor_movies',
        as: 'movies',
      })
    }

    // fields to not return
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Actor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Actor must have a name' },
          len: {
            args: [2, 100],
            msg: 'Name must have 2 - 50 caracters.',
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'actors',
      modelName: 'Actor',
    }
  )

  SequelizeSlugify.slugifyModel(Actor, {
    source: ['name'],
    overwrite: false,
  })

  return Actor
}
