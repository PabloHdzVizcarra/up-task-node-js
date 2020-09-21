import tareas from './modules/proyectos';
import tasks from './modules/tasks';
import changeTaskStatus from '../../functions/change-task-status';
import { updateAdvance } from '../js/functions/current-project-progress';

//* podemos crear un solo archivo llamado app, y en el importar todo el javascript que vayamos agregando al proyecto, de esta manera todo estara en un solo lugar

document.addEventListener('DOMContentLoaded', () => {
  updateAdvance();
})