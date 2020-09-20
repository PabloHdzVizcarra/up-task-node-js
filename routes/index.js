const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectos-controller');
const { body } = require('express-validator/check');
const taskController = require('../controllers/task-controller');

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
  
  //^ routers
  router.get("/", proyectosController.proyectosHome);
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
  router.post("/nuevo-proyecto",
    body('name').not().isEmpty().trim().escape(), //_ revisamos el body del metodo POST para validacion
    proyectosController.nuevoProyecto //_ mandamos los datos del metodo POST al controlador
  );

  // router para el proyecto individual
  router.get('/proyectos/:url', proyectosController.proyectoPorURL);

  // Actualizar el proyecto
  router.get('/proyecto/editar/:id',
    proyectosController.formularioEditar
  );

  router.post("/nuevo-proyecto/:id",
  body('name').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto,
  )

  //! Delete Project
  router.delete(
    '/proyectos/:url',
    proyectosController.eliminarProyecto
  )

  // Add Tasks 
  router.post(
    '/proyectos/:url',
    taskController.addTask
  );

  // Update task
  router.patch('/tareas/:id', taskController.checkTaskStatus);

  // Update task
  router.delete('/tareas/:id', taskController.deleteTask);

  return router;
};