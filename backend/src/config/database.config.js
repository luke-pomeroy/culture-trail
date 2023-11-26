module.exports = {
  development: {
    storage: process.env.DB_STORAGE,
    dialect: process.env.DB_DIALECT,
    seederStorage: "sequelize",
    benchmark: true,
    logQueryParameters: true,
    typeValidation: true,
    // logging: false
  },
  test: {
    storage: process.env.DB_STORAGE,
    dialect: process.env.DB_DIALECT,
    seederStorage: "sequelize",
    // logging: false
  },
  production: {
    storage: process.env.DB_STORAGE,
    dialect: process.env.DB_IALECT,
    seederStorage: "sequelize",
  }
};