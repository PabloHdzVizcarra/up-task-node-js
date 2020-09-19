import Swal from "sweetalert2";
import axios from "axios";

export const btnDelete = document.querySelector("#delete-project");

if (btnDelete) {
  btnDelete.addEventListener("click", (event) => {
    Swal.fire({
      title: "Deseas borrar este proyecto?",
      text: "Un proyecto eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const projectURL = event.target.dataset.urlProject;
        const url = `${location.href}`;

        axios.delete(url, { params: { url } })
          .then(() => {
            Swal.fire(
              "Eliminado",
              "El proyecto fue eliminado con exito.",
              "success"
            );
          })
          .catch(console.log);
      }

      //window.location.href = '/';
    });
  });
}
