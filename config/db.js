const { Sequelize } = require("sequelize");

const db = new Sequelize("uptasknode", "pablohdz", "seguimos_182", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  operatorsAliases: false,
  define: {
    timestamps: false,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// configuracion de sequelize para interectuar con el ORM

//* recuerda exportar
module.exports = db;
