const { changeTaskStatus } = require("../functions/change-task-status");
const Proyectos = require("../models/Proyectos");
const TaskModel = require("../models/Tasks");

exports.addTask = async (req, res, next) => {
  // get actual project of database
  const project = await Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });

  // read input value
  const { task } = req.body;
  // add task status to false
  const taskState = 0;
  // add current id project
  const projectID = project.id;

  console.log(task, taskState, projectID);

  // insert to database
  const result = await TaskModel.create({
    task,
    state: taskState,
    proyectoId: projectID,
  });

  if (!result) return next();

  // redirect
  res.redirect(`/proyectos/${req.params.url}`);
};

exports.checkTaskStatus = async (req, res, next) => {
  //_ req.params nos sirve para leer los datos que envies en el metodo desde el navegador

  const { id } = req.params;
  const taskFromDatabase = await TaskModel.findOne({
    where: {
      id,
    },
  });

  changeTaskStatus(taskFromDatabase);
  const result = await taskFromDatabase.save();
  if (!result) return next();

  res.status(200).send("Actualizado");
};

exports.deleteTask = async (req, res, next) => {
  const { id } = req.params;

  // delete task
  const result = await TaskModel.destroy({
    where: {
      id,
    },
  });

  !result ? next() : res.status(200).send("Tarea eliminada correctamente");
};
