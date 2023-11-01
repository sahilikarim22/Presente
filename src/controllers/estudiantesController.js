const conexion = require("../db/config");

const estudiantesController = {
  getEntrada: (req, res) => {
    res.render("estudiantes/entrada");
  },
  getInicio: (req, res) => {
    res.render("estudiantes/inicio");
  },
  getCursos: (req, res) => {
    const idUsuario = req.session.userId;

    const cursosSQL = `
      SELECT c.nombreCurso, c.cantDiasSemanas, c.seccion, c.idCurso
      FROM curso_estudiante
      INNER JOIN cursos c ON curso_estudiante.idCurso = c.idCurso
      WHERE curso_estudiante.idUsuario = ?`;

    conexion.query(cursosSQL, [idUsuario], (err, cursos) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error de servidor");
      }
      console.log(cursos);
      res.render("estudiantes/cursos", { cursos: cursos });
    });
  },
  gerCursoInfo:(req, res)=>{
    
  }
};

// exportar modulos

module.exports = estudiantesController;
