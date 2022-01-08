'use strict'
import { Model } from 'sequelize'

interface ActorMovieAttributes {
  actorId: number
  movieId: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ActorMovie
    extends Model<ActorMovieAttributes>
    implements ActorMovieAttributes
  {
    actorId!: number
    movieId!: string
  }
  ActorMovie.init(
    {
      actorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Actor',
          key: 'id',
        },
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Movie',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'actor_movies',
      modelName: 'ActorMovie',
    }
  )
  return ActorMovie
}
