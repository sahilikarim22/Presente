const express = require('express');
const router = express.Router();
const conexion = require('../db/config');
<<<<<<< HEAD
const periodosController = require('../controllers/periodosController');
=======
const indexController = require('../controllers/indexController');
>>>>>>> 134ebd6402e42205474522cd1f61b87a30e2172b
const registrarseController = require('../controllers/registrarseController');
const iniciarSesionController = require('../controllers/iniciarSesionController');
const estudiantesController = require('../controllers/estudiantesController');
const usuariosController = require('../controllers/usuariosController');

const cursosProfController = require('../controllers/cursoProfController');

const adminController = require('../controllers/adminController');
const cursosController = require('../controllers/cursosController');
const loginController = require('../controllers/loginController');

// Ruta de inicio

//gets
<<<<<<< HEAD
router.get('/periodos', periodosController.getPeriodos);
=======
router.get('/', indexController.getIndex);
>>>>>>> 134ebd6402e42205474522cd1f61b87a30e2172b
router.get('/registrarse', registrarseController.getRegistrarse);
router.get('/iniciarSesion', iniciarSesionController.getIniciarSesion);
router.get('/admin',adminController.getAdmin);
router.get('/admin/cursos', cursosController.getCursos);
router.get('/estudiantes',requireLogin, estudiantesController.getEstudiantes);
<<<<<<< HEAD
router.get('/profesor/cursosprof', cursosProfController.getCursosProf);


//posts
router.post('/guardarUsuario', usuariosController.postUsuarios);
router.post('/login',loginController.postLogin);
router.post('/guardarPeriodo', adminController.postPeriodo);
// router.post('/guardarCurso',loginController.);

//funciones que requiere login
function requireLogin(req, res, next) {
    console.log('req.session: '+req.session+'req.session.userId: '+req.session.userId);
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
=======
router.get('/admin/cursosprof', cursosProfController.getCursosProf);
<<<<<<< HEAD
router.get('/confirmar/:token', usuariosController.getConfirmacion);
=======
>>>>>>> 134ebd6402e42205474522cd1f61b87a30e2172b
>>>>>>> e6dcea2b18f164306b4caf42d503bd4dc1ef3465


//posts
router.post('/guardarUsuario', usuariosController.postUsuarios);
router.post('/login',loginController.postLogin);
router.post('/guardarPeriodo', adminController.postPeriodo);
// router.post('/guardarCurso',loginController.);

//funciones que requiere login
function requireLogin(req, res, next) {
    console.log('req.session: '+req.session+'req.session.userId: '+req.session.userId);
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

module.exports = router;