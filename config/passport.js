const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

// Se tiene que hacer referencia al modelo que autenticaras
const UserModel = require("../models/Users");

// local-strategy Login con credenciales propios
//_ con esto validamos el usuario => Object
passport.use(
  new localStrategy(
    //* por default passport espera un usuario y password
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({
          where: { email: email },
        });

        //_ el usuario si existe

        if (!user.checkPassword(password)) {
          return done(null, false, {
            message: "Password incorrecto",
          });
        }

        return done(null, user);
      } catch (error) {
        // El usuario no existe
        return done(null, false, {
          message: "Esa cuenta no existe",
        });
      }
    }
  )
);

// serializar el usuario
passport.serializeUser((user, callback) => {
  callback(null, user);
});

//deserializar el usuario
passport.deserializeUser((user, callback) => {
  callback(null, user);
});

//
module.exports = passport;
