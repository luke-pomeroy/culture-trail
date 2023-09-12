module.exports = {
  development: {
    storage: "src/db/dev.db",
    dialect: "sqlite",
    seederStorage: "sequelize",
    benchmark: true,
    logQueryParameters: true,
    typeValidation: true,
    // logging: false
  },
  test: {
    storage: "src/db/test.db",
    dialect: "sqlite",
    seederStorage: "sequelize",
    // logging: false
  },
  production: {
    storage: "src/db/test.db",
    dialect: "sqlite",
    seederStorage: "sequelize",
  }
};