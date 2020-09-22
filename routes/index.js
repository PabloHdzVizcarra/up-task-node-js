const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectos-controller');
const { body } = require('express-validator/check');
const taskController = require('../controllers/task-controller');
const usuariosController = require('../controllers/users-controller');
const   authController = require('../controllers/auth-controller');

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
  router.get("/",
    
    authController.userAuthFn, //_ verificamos si el usuario esta autenticado
    proyectosController.proyectosHome
  );
  router.get("/nuevo-proyecto",
    authController.userAuthFn,
    proyectosController.formularioProyecto
  );
  router.post("/nuevo-proyecto",
    authController.userAuthFn,
    body('name').not().isEmpty().trim().escape(), //_ revisamos el body del metodo POST para validacion
    proyectosController.nuevoProyecto //_ mandamos los datos del metodo POST al controlador
  );

  // router para el proyecto individual
  router.get('/proyectos/:url',
    authController.userAuthFn,
    proyectosController.proyectoPorURL
  );

  // Actualizar el proyecto
  router.get('/proyecto/editar/:id',
    authController.userAuthFn,
    proyectosController.formularioEditar
  );

  router.post("/nuevo-proyecto/:id",
    authController.userAuthFn,
    body('name').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto,
  )

  //! Delete Project
  router.delete(
    '/proyectos/:url',
    authController.userAuthFn,
    proyectosController.eliminarProyecto
  )

  // Add Tasks 
  router.post(
    '/proyectos/:url',
    authController.userAuthFn,
    taskController.addTask
  );

  // Update task
  router.patch('/tareas/:id',
    authController.userAuthFn,
    taskController.checkTaskStatus
  );

  // Update task
  router.delete('/tareas/:id',
    authController.userAuthFn,
    taskController.deleteTask
  );

  // Crea una nueva cuenta
  router.get('/crear-cuenta', usuariosController.formCreateAccount);
  router.get('/confirm/:email', usuariosController.confirmAccount);
  router.post('/crear-cuenta', usuariosController.createAccount);


  // iniciar sesion
  router.get('/iniciar-sesion', usuariosController.formStartLogin);
  router.post('/iniciar-sesion', authController.authUser);

  // close session
  router.get('/cerrar-sesion', authController.closeSession);


  router.get('/restablecer', usuariosController.resetPasswordForm);
  router.post('/restablecer', authController.sendToken);
  router.get('/restablecer/:token', authController.validateToken);
  router.post('/restablecer/:token', authController.updatePassword);

  return router;
};