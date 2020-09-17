const express = require('express');
const routes = require('./routes');

// crear una aplicacion de express
const app = express();

// se usan los routes definidos en la carpeta 
app.use('/', routes());

app.listen(3000);
