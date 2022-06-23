const express = require('express')
const personas = require('./Routers/routersPersonas')
const telefonos = require('./Routers/routerstelefonos')
const app = express()

app.use("/personas/",personas.router)
app.use("/telefonos/",telefonos.router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('No Encontrado');
    err.status = 404;
    next(err);
  });

app.listen(8080)