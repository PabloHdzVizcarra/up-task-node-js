const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require("body-parser");
const db = require('./config/db'); // conexion a mysql a la DB
const helpers = require('./helpers'); // helpers

// importar el modelo del proyecto
require('./models/Proyectos');

db.sync()
  .then(() => console.log('Conectado al servidor'))
  .catch(console.log);

// crear una app de express
const app = express();

// donde cargar archivos estaticos
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

// agregar la carpeta de vistas
app.set('views', path.join(__dirname, './views'));

//* Middleware
// pass var dump to the application
app.use((req, res, next) => {
  //_ crear una variable, para poder consumirla en todos los archivos
  // usamos la funcion que creamos para establecerla local y poder ejecutarla
  res.locals.vardump = helpers.vardump;
  next();
});

// habilitar body parser para leer datos del form
app.use(bodyParser.urlencoded({ extended: true }));


// se usan los routes definidos en la carpeta 
app.use('/', routes());

app.listen(3000);

