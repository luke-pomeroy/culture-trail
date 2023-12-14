module.exports = {
  development: {
    storage: process.env.DB_STORAGE,
    dialect: process.env.DB_DIALECT,
    seederStorage: "sequelize",
    benchmark: true,
    logQueryParameters: true,
    typeValidation: true,
    logging: process.env.DB_LOGGING === 'true'
  },
  test: {
    storage: process.env.DB_STORAGE,
    dialect: process.env.DB_DIALECT,
    seederStorage: "sequelize",
    logging: process.env.DB_LOGGING === 'true'
  },
  production: {
    storage: process.env.DB_STORAGE,
    dialect: process.env.DB_DIALECT,
    seederStorage: "sequelize",
    logging: false
  }
};