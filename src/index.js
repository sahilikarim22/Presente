const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
// importar boxicons
// const boxicons = require('boxicons');


// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(__dirname + '/../public'));

// Rutas
const indexRouter = require('./routes/routes');
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
