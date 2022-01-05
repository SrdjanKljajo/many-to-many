'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ActorMovie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // fields to not return
    toJSON() {
      return {
        ...this.get(),
        createdAt: undefined,
        updatedAt: undefined,
        movieId: undefined,
        actorId: undefined,
      }
    }
  }

  ActorMovie.init(
    {
      actorId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'actor_movies',
      modelName: 'ActorMovie',
    }
  )
  return ActorMovie
}
