const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require("body-parser");

// crear una app de express
const app = express();

// donde cargar archivos estaticos
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

// agregar la carpeta de vistas
app.set('views', path.join(__dirname, './views'));

// habilitar body parser para leer datos del form
app.use(bodyParser.urlencoded({ extended: true }));


// se usan los routes definidos en la carpeta 
app.use('/', routes());

app.listen(3000);
