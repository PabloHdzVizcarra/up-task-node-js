// controlador para la ruta home
exports.proyectosHome = (req, res) => {
  res.render("index", {
    namePage: "Proyectos"
  });
};

exports.formularioProyecto = (req, res) => {
  // en render tienes que poner el nombre de tu archivo que usaras
  res.render("nuevoProyecto", {
    namePage: "Nuevo Proyecto"
  });
};

exports.nuevoProyecto = (req, res) => {
  // enviar a la consola lo que el usuario escriba
  console.log(req.body);

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
    res.render('nuevoProyecto', {
      namePage: "Nuevo Proyecto",
      errors
    });

  } else {
    
  }

};
