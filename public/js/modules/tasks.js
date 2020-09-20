import axios from "axios";
import Swal from "sweetalert2";

const tasks = document.querySelector(".js-pending-task");

if (tasks) {
  tasks.addEventListener("click", (event) => {
    // verificamos si presionamos el boton de check
    if (event.target.classList.contains("fa-check-square")) {
      const icon = event.target;
      const taskID = icon.parentElement.parentElement.dataset.task;

      // add a request to update task
      const url = `${location.origin}/tareas/${taskID}`;
      axios
        .patch(url, {
          taskID,
        })
        .then((response) => {
          if (response.status === 200) {
            icon.classList.toggle("task-completed");
          }
        });
    }

    if (event.target.classList.contains("fa-trash")) {
      const taskHTML = event.target.parentElement.parentElement;
      const taskID = parseInt(taskHTML.dataset.task);

      Swal.fire({
        title: "Deseas borrar este tarea?",
        text: "Una tarea eliminada no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "No, Cancelar",
      }).then((result) => {
        if (result.value) {
          const url = `${location.origin}/tareas/${taskID}`;
          axios
            .delete(url, {
              params: {
                taskID,
              },
            })
            .then((resp) => {
              if (resp.status === 200) {
                // Delete node task

                taskHTML.parentElement.removeChild(taskHTML);

                // Alert Optional
                Swal.fire(
                  'Tarea Eliminada',
                  resp.data,
                  'success'
                )
              }
            });
        }
      });
    }
  });
}

export default tasks;
