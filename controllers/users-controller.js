const { sendMailToResetPassword } = require("../handlers/email");
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

    
    //_ crear una URL de confirmar
    const urlToConfirmEmail = `http://${req.headers.host}/confirm/${email}`;
    
    //_ crear el objeto de usuario
    const userData = {
      email: email,
    }

    //_ enviar email
    
    await sendMailToResetPassword({
      user: userData,
      subject: 'Confirma tu cuenta',
      urlToConfirmEmail,
      file: 'confirm-account'
    });
    
    //_ redirigir al usuario
    
    req.flash('correcto', 'Enviamos un correo a tu email para confirmar tu cuenta');
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

exports.confirmAccount = async (req, res) => {

  const userFromDatabase = await UserModel.findOne({
    where: {
      email: req.params.email
    }
  });

  if (!userFromDatabase) {
    req.flash('error', 'No valido');
    res.redirect('/crear-cuenta');
  }

  userFromDatabase.active = 1;
  await userFromDatabase.save();

  req.flash('correcto', 'Cuenta activada correctamente');
  res.redirect('/iniciar-sesion');
}