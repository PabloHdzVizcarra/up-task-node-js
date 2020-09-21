import Swal from "sweetalert2";

export const updateAdvance = () => {
  const tasks = document.querySelectorAll('li.js-task');
  
  if (tasks.length !== 0) {
    const tasksCompleted = document.querySelectorAll('i.js-task-completed');

    const projectAdvance = Math.round((tasksCompleted.length / tasks.length) * 100);

    const barPercentage = document.querySelector('#js-advance-bar-porcent');
    barPercentage.style.width = projectAdvance + '%';

    if (projectAdvance === 100) {
      Swal.fire(
        'Completaste el proyecto',
        'Felicidades has terminado tus tareas',
        'success',
      )
    }

  }

}