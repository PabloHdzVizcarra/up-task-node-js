const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require("body-parser");
const db = require('./config/db'); // conexion a mysql a la DB
const helpers = require('./helpers'); // helpers
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');


// importar el modelo del proyecto
require('./models/Proyectos');
require('./models/Tasks');
require('./models/Users');

db.sync()
  .then(() => console.log('Conectado al servidor'))
  .catch(console.log);

// crear una app de express
const app = express();

// donde cargar archivos estaticos
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

// habilitar body parser para leer datos del form
app.use(bodyParser.urlencoded({ extended: true }));

// agregar la carpeta de vistas
app.set('views', path.join(__dirname, './views'));

// agregar flash messages
app.use(flash());

// guardar cookies en el navegador
app.use(cookieParser());

// sesiones para el app, permiten navegar por distintas paginas sin volvernos a autenticar
app.use(session({
  secret: 'dataX',
  resave: false,
  saveUninitialized: false
}));

// agregar passport
app.use(passport.initialize());
app.use(passport.session());


//* Middleware
// pass var dump to the application
app.use((req, res, next) => {
  //_ crear una variable, para poder consumirla en todos los archivos
  // usamos la funcion que creamos para establecerla local y poder ejecutarla
  res.locals.vardump = helpers.vardump;
  res.locals.messages = req.flash();
  // de esta manera guardamos la referencia al usuario autenticado
  res.locals.dataUser = { ...req.user } || null;
  next();
});

// se usan los routes definidos en la carpeta 
app.use('/', routes());

app.listen(3000);

