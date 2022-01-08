import { Model } from 'sequelize'
const { SequelizeSlugify } = require('sequelize-slugify')

interface ActorAttributes {
  id: number
  name: string
  slug: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Actor extends Model<ActorAttributes> implements ActorAttributes {
    id!: number
    name!: string
    slug!: string

    static associate(models: any) {
      Actor.belongsToMany(models.Movie, {
        foreignKey: 'actorId',
        through: 'actor_movies',
      })
    }
  }
  Actor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
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
