const passport = require('passport');
const userModel = require('../models/Users');
const crypto = require('crypto');
const UserModel = require('../models/Users');
const Sequelize = require('sequelize');
const bcrypt = require("bcrypt-nodejs");
const { sendMailToResetPassword } = require('../handlers/email');
const Op = Sequelize.Op;

exports.authUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/iniciar-sesion',
  failureFlash: true,
  badRequestMessage: 'Ambos campos son obigatorios'
});

// fucntion para verificar si el usuario esta autenticado
exports.userAuthFn = (req, res, next) => {

  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/iniciar-sesion');
}

exports.closeSession = (req, res) => {
  req.session.destroy(() => { //_ cerrar sesion con passport
    res.redirect('/iniciar-sesion');
  })
}

exports.sendToken = async (req, res) => {

  const userFromDatabase = await userModel.findOne({
    where: {
      email: req.body.email
    }
  })

  if (!userFromDatabase) {
    req.flash('error', 'No existe esa cuenta');

    res.render('restablecer', {
      namePage: 'Restablece tu password',
      messages: req.flash(),
    })
  }

  // se agrega el token al modelo de usuario y se guarda en la DB
  userFromDatabase.token = crypto.randomBytes(20).toString('hex');
  userFromDatabase.expirationTimeToken = Date.now() + 3600000;
  
  await userFromDatabase.save();

  const resetURL = `http://${req.headers.host}/restablecer/${userFromDatabase.token}`;

  await sendMailToResetPassword({
    user: userFromDatabase,
    subject: 'Password Reset',
    resetURL: resetURL,
    file: 'reset-password'
  })

  req.flash('correcto', 'Se envio un mensaje a tu correo con las instrucciones para restablecer tu password');
  res.redirect('/iniciar-sesion');
}

exports.validateToken = async (req, res) => {
  const userFromDatabase = await UserModel.findOne({
    where: {
      token: req.params.token
    }
  });

  if (!userFromDatabase) {
    req.flash('error', "Token no valido");
    res.redirect('/restablecer');
  }

  res.render('resetPassword', {
    namePage: 'Restablecer Password'
  })
}

exports.updatePassword = async (req, res) => {

  //* verificamos el toekn valido y fecha de expiracion
  const userFromDatabase = await UserModel.findOne({
    where: {
      token: req.params.token,
      expirationTimeToken: {
        [Op.gte] : Date.now()
      }
    }
  });


  if (!userFromDatabase) {
    req.flash('error', 'Token no valido');
    res.redirect('/restablecer');
  }

  //_ se tiene que volver a hashear el password

  

  userFromDatabase.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  userFromDatabase.token = null;
  userFromDatabase.expirationTimeToken = null;

  await userFromDatabase.save();

  req.flash('correcto', 'Tu password se ha modificado correctamente');
  res.redirect('/iniciar-sesion');

}