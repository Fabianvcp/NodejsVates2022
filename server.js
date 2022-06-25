const express = require('express')
const personas = require('./Routers/routersPersonas')
const telefonos = require('./Routers/routerstelefonos')
const app = express()

app.use("/telefonos/",telefonos.router)
app.use("/personas/",personas.router)


app.listen(8080)