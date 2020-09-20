const Proyectos = require("../models/Proyectos");
const TaskModel = require('../models/Tasks');

// controlador para la ruta home
exports.proyectosHome = async (req, res) => {
  //_ Get projects of data base
  const proyectos = await Proyectos.findAll();

  res.render("index", {
    namePage: "Proyectos",
    proyectos, //_ pass data to view
    blink: "Blink 182"
  });
};

exports.formularioProyecto = async (req, res) => {
  // tenemos que elaborar la consulta a la data base
  const proyectos = await Proyectos.findAll();

  // en render tienes que poner el nombre de tu archivo que usaras
  res.render("nuevoProyecto", {
    namePage: "Nuevo Proyecto",
    proyectos,
  });
};

exports.nuevoProyecto = async (req, res) => {
  // tenemos que elaborar la consulta a la data base
  const proyectos = await Proyectos.findAll();

  // validacion del valor del input
  //* en esta parte podemos manejar js comun
  const { name } = req.body;
  let errors = [];

  if (!name) {
    errors.push({
      texto: "Agrega un nombre al proyecto",
    });
  }

  // validacion de errores
  if (errors.length > 0) {
    res.render("nuevoProyecto", {
      namePage: "Nuevo Proyecto",
      errors,
      proyectos,
    });
  } else {
    // creamos una URL para el proyecto
    // const url = slug(name).toLowerCase();

    await Proyectos.create({ name });
    res.redirect("/");
  }
};

exports.proyectoPorURL = async (req, res, next) => {
  // tenemos que elaborar la consulta a la data base
  const proyectosPromise = Proyectos.findAll();

  // traemos el proyecto de la Data Base
  // metodo findOne (Sequelize) para obtener 1 solo elemento
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);


  // check current project task
  const tasks = await TaskModel.findAll({
    where: {
      proyectoId: proyecto.id
    },
    include: [ //* with this method we include data to the query
      {
        model: Proyectos
      }
    ]
  });

  if (!proyecto) return next();

  // render a la view
  res.render("tareas", {
    namePage: "Tareas del Proyecto",
    proyecto,
    proyectos,
    tasks
  });
};

exports.formularioEditar = async (req, res) => {
  // tenemos que elaborar la consulta a la data base
  const proyectosPromise = Proyectos.findAll();

  // get data actual element
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  // render view
  res.render("nuevoProyecto", {
    namePage: "Editar Proyecto",
    proyectos,
    proyecto,
  });
};

exports.actualizarProyecto = async (req, res) => {
  // tenemos que elaborar la consulta a la data base
  const proyectos = await Proyectos.findAll();

  // validacion del valor del input
  //* en esta parte podemos manejar js comun
  const { name } = req.body;
  let errors = [];

  if (!name) {
    errors.push({
      texto: "Agrega un nombre al proyecto",
    });
  }

  // validacion de errores
  if (errors.length > 0) {
    res.render("nuevoProyecto", {
      namePage: "Nuevo Proyecto",
      errors,
      proyectos,
    });
  } else {
    await Proyectos.update({ name: name }, { where: { id: req.params.id } });

    res.redirect("/");
  }
};

exports.eliminarProyecto = async (req, res, next) => {
  // request tiene la informacion
  // puedes usar query o params para obtener los datos
  const { url } = req.params;

  // metodo de sequelize para eliminar
  const resultOfDeleteProject = await Proyectos.destroy({
    where: { url: url },
  });

  if (!resultOfDeleteProject) return next();

  res.status(200).send("Proyecto eliminado correctamente");
};