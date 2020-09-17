const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectos-controller');

//  .use() es un metodo (middleware) que acepta 2 parametros el primero es la ruta y el segundo es una funcion de flecha de 2 parametros
//  cualquier request que elabores correra los metodos .use()
// app.use('/', (req, res) => {
//   
    /*
      req: es la consulta que tu elaboras desde el navegador
      res: es lo que te retorna la consulta en base al req que implementes
    */
  
//    el metodo .res() mostrara en el navegador lo que este dentro en este caso es un simple string
//   res.send("hola");
// });


module.exports = function () {
  
  //^ ruta para el home
  router.get("/", proyectosController.proyectosHome);

  //^ ruta pagina nosotros
  router.get("/nosotros", proyectosController.nosotros);

  return router;
}