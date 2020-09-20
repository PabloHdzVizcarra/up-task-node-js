const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const TaskModel = db.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: 'true',
    autoIncrement: true
  },
  task: Sequelize.STRING(100),
  state: Sequelize.INTEGER,

});

// relacionamos la tarea a un proyecto con sequelize
TaskModel.belongsTo(Proyectos);

module.exports = TaskModel;