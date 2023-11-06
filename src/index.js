const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejsMate = require('ejs-mate');
require('dotenv').config();



// Configurar EJS como motor de plantillas
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 1000, // Duración de 3 horas en milisegundos
    },
  })
);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack); // Registro del error
  res.status(500).render('/error', { errorMensaje: err.message });
});

//service worker
app.get('/manifest.json', (req, res) =>{
  res.sendFile(__dirname+'/views/manifest.json');
});

// Rutas
const indexRouter = require('./routes/routes');
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});


