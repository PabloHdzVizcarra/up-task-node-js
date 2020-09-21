const UserModel = require("../models/Users");


exports.formStartLogin = (req, res) => {
  const { error: errorMessage } = res.locals.messages;
  res.render('startLogin', {
    namePage: 'Iniciar Sesion en UpTask',
    errorMessage
  });
}

exports.formCreateAccount = (req, res) => {
  res.render('createAccount', {
    namePage: 'Crear Cuenta en UpTask'
  });
}

exports.createAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    await UserModel.create({
      email,
      password
    });

    res.redirect('/iniciar-sesion');
  } catch (error) {

    //_ usamos flash() para poder generar los errores en la vista
    req.flash('error', error.errors.map(error => error.message));

    res.render('createAccount', {
      messages: req.flash(),
      namePage: 'Crear Cuenta en UpTask',
      email,
      password
    });
  }
}

exports.resetPasswordForm = (req, res) => {
  res.render('restablecer', {
    namePage: 'Restablece tu Password'
  })
}