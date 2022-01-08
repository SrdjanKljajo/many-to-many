import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })

module.exports = {
  development: {
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    host: String(process.env.DB_HOST),
    dialect: String('postgres'),
  },
  test: {
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    host: String(process.env.DB_HOST),
    dialect: String('postgres'),
  },
  production: {
    username: String(process.env.DB_USERNAME_PROD),
    password: String(process.env.DB_PASSWORD_PROD),
    database: String(process.env.DB_DATABASE_PROD),
    host: String(process.env.DB_HOST_PROD),
    dialect: String('postgres'),
  },
}
