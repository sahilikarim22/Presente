const express = require('express');
const router = express.Router();
const conexion = require('../db/config');
const indexController = require('../controllers/indexController');
const registrarseController = require('../controllers/registrarseController');
const iniciarSesionController = require('../controllers/iniciarSesionController');
const estudiantesController = require('../controllers/estudiantesController');
const usuariosController = require('../controllers/usuariosController');
const adminController = require('../controllers/adminController');
const cursosController = require('../controllers/cursosController');
const loginController = require('../controllers/loginController');
const profesorController = require('../controllers/profesorController');

// Ruta de inicio

//**************GETS***********************
//admin 
router.get('/admin', requireLogin, checkUserType('administrador'), adminController.getAdmin);
router.get('/admin/cursos/:idPeriodo', requireLogin, checkUserType('administrador'), adminController.getAdminCursosPeriodo);
router.get('/admin/verCurso/:idCurso', requireLogin, checkUserType('administrador'), adminController.getAdminCursoDetalle);
router.post('/cambiarEstadoPeriodo/', adminController.putStatusPeriodo);

//profesores
router.get('/profesor/periodos', requireLogin, checkUserType('docente'), profesorController.getPeriodos);
router.get('/profesor/cursos/:idPeriodo', requireLogin, checkUserType('docente'), profesorController.getCursos);
router.get('/profesor/curso/:idCurso/:idPeriodo',  requireLogin, checkUserType('docente'), profesorController.getCursoInfo);
router.get('/profesor/asistencias/:idCurso/:idPeriodo',  requireLogin, checkUserType('docente'), profesorController.getAsistencias);

router.get('/confirmarUsuario',usuariosController.getConfirmarUsuario);


//estudiantes
router.get('/estudiantes/cursos/', requireLogin, checkUserType('estudiante'),estudiantesController.getCursos);
router.get('/estudiantes/inicio/', requireLogin, checkUserType('estudiante'), estudiantesController.getInicio);
router.get('/estudiantes/entrada/', requireLogin, checkUserType('estudiante'), estudiantesController.getEntrada);
// router.get('/estudiantes/cursoInfo/:idCurso', requireLogin, checkUserType('estudiante'), estudiantesController.getCursoInfo);

router.get('/', indexController.getIndex);
router.get('/registrarse', registrarseController.getRegistrarse);
router.get('/iniciarSesion', iniciarSesionController.getIniciarSesion);
router.get('/confirmar/:token', usuariosController.getConfirmacion);

//posts
router.post('/guardarUsuario', usuariosController.postUsuarios);
router.post('/login',loginController.postLogin);
router.post('/guardarPeriodo', adminController.postPeriodo);
router.post('/guardarCurso', cursosController.postCurso);
router.post('/guardarUsuario', usuariosController.postUsuarios);
router.post('/login',loginController.postLogin);
router.post('/guardarPeriodo', adminController.postPeriodo);
// profesor
router.post('/guardarAsistencia/:idCurso/:idPeriodo', profesorController.postAsistencia);
// router.post('/guardarCurso',loginController.);
router.post('/eliminarPeriodo',adminController.deletePeriodo);

//estudiantes
router.post('/inscribirCurso', estudiantesController.postInscripcionCurso);

//puts

router.put('/editarCurso/:idCurso',cursosController.putCurso);

//deletes

router.delete('/eliminarCurso/:idCurso', cursosController.deleteCurso);
router.delete('/eliminarEstudianteCurso', profesorController.deleteEstudianteCurso);

//funciones que requiere login
function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        
      // Obtener el usuario de la base de datos
      conexion.query(
        "SELECT * FROM usuarios WHERE id = ?",
        [req.session.userId],
        (error, results) => {
          if (results.length > 0) {
            const user = results[0];
            if (user.estatus === 1) {
              // El usuario está activo, continuar con la lógica de autenticación
              return next();
            } else {
              // El usuario no está activo, redirigir a una página de error o mostrar un mensaje de error
              res.redirect("/iniciarSesion");
            }
          } else {
            // No se encontró el usuario en la base de datos, redirigir a una página de error o mostrar un mensaje de error
            req.flash("Ha ocurrido un error");
          }
        }
      );
    } else {
      // El usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
      res.redirect("/iniciarSesion");
    }
  }

// funcion para verificar el tipo de usuario
function checkUserType(type) {
  return function(req, res, next) {
    const tipoUsuario = req.session.tipoUsuario; // Suponiendo que el tipo de usuario se guarda en la sesión
    if (tipoUsuario === type) {
      // El usuario tiene el tipo de usuario correcto, permitir acceso
      return next();
    } else {
      // No es el tipo de usuario correcto, negar acceso
      return res.status(403).send('Acceso denegado');
    }
  };
}

// Ruta para logout
router.get('/logout', (req, res) => {
  // Realiza cualquier limpieza necesaria en la sesión u otros datos de usuario
  req.session.destroy((err) => {
      if (err) {
          console.log(err);
          return res.redirect('/'); // Redirige a la página de inicio si ocurre un error
      }
      res.redirect('/iniciarSesion'); // Redirige a la página de inicio de sesión tras cerrar la sesión
  });
});


module.exports = router;