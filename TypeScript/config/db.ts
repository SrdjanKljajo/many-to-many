import db from '../models'

export const connectToDatabase = async (): Promise<any> => {
  try {
    await db.sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error: any) {
    console.error('Unable to connect to the database:', error)
  }
}
