const passport = require('passport');
const userModel = require('../models/Users');

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
  console.log(res.body);
  console.log(res.params);

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

}