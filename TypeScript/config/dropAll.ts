import db from '../models'

const dropAll = async (): Promise<any> => {
  try {
    await db.sequelize.drop()
    console.log('All tables dropped!')
  } catch (error: any) {
    console.error('Unable to connect to the database:', error)
  }
}

dropAll()
