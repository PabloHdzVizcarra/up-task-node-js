const Sequelize = require("sequelize");
const db = require("../config/db");
const Proyectos = require("./Proyectos");
const bcrypt = require("bcrypt-nodejs");

const UserModel = db.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Agrega un correo valido",
        },
        notEmpty: {
          msg: "El E-mail no puede ir vacio",
        },
      },
      unique: {
        args: true,
        message: "Usuario ya registrado",
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El password no debe ir vacio",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate(userData) {
        userData.password = bcrypt.hashSync(
          userData.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);

// Metodos personalizados
UserModel.prototype.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

//* indicamos a sequelize que un usuario puede tener multiples proyectos
UserModel.hasMany(Proyectos);

module.exports = UserModel;
