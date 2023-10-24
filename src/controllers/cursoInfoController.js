const conexion = require('../db/config');

const cursoInforController = {
    getCursoInfo: (req, res) => {
        const idCurso = req.params.idCurso;
        const idPeriodo = req.params.idPeriodo;

        console.log(idCurso, idPeriodo);

        conexion.query('SELECT * FROM cursos WHERE idCurso=? AND idPeriodo=?',[ idCurso, idPeriodo ], (err,curso)=>{
            if(err) throw err;
            console.log(curso);
            res.render('profesor/cursoInfo', { curso: curso[0]});
        });
    },
  };
  
  module.exports = cursoInforController;