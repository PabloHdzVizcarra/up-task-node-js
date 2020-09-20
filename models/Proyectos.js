const Sequelize = require("sequelize");
const slug = require("slug");
const db = require("../config/db");

// creamos la tabla de proyectos en sequelize
const Proyectos = db.define(
  "proyectos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING(100),
    url: Sequelize.STRING(100),
  },
  {
    hooks: { //Este hook se usa para revisar datos antes de insertarlos en la DB
      beforeCreate(proyecto) {
        // agregamos un obj que sera el modelo creado
        const url = slug(proyecto.name).toLowerCase();

        proyecto.url = url;
      }
    },
  }
);

module.exports = Proyectos;
