import Swal from "sweetalert2";
import axios from "axios";

export const btnDelete = document.querySelector("#delete-project");

if (btnDelete) {
  btnDelete.addEventListener("click", () => {
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
        //  location.href hace referencia a la url actual
        const url = `${location.href}`;

        axios
          .delete(url, { params: { url } })
          .then((result) => {
            Swal.fire("Eliminado", result.data, "success");
          })
          .catch(() => { //_ se maneja el error en caso de que suceda una falla
            Swal.fire({
              type:'error',
              title: 'Hubo un error',
              text: 'No se pudo eliminar el proyecto'
            })
          });
      }
    });
  });
}
