const express = require('express')
const gestor = require('../Gestor/gestorDataBases')
const router = express.Router()

// Relación entre personas y telefonos
//buscar las personas cuyo nombre o apellido incluyen una subcadena
router.get("/", async(req, res) => {
    let persona = req.query.filtro;
    let persona_encontrada = await gestor.consultarFiltroNombreApellido(persona)
    if (persona_encontrada) 
            res.json(persona_encontrada)
    else
        res.status(400).send("La linea no fue encontrada")

    res.end()

})
//consultar los telefonos de una persona
router.get("/:id/telefonos", async (req, res) => {
    let documento = parseInt(req.params.id)
    
    if (!isNaN(documento))  { // Si no es NaN, es porque es un número correcto
        let linea_encontradas = await gestor.consultarLineaPorDueño(documento)

        if (linea_encontradas) 
            res.json(linea_encontradas)
        else
            res.status(400).send("La linea no fue encontrada")
    }
    else
        res.status(400).send("El parámetro debe ser numérico")

    res.end()
})



//consultar los telefonos de una persona
router.get("/:id/telefonos/:tipo", async (req, res) => {
    let documento = parseInt(req.params.id)
    let tipo = parseInt(req.params.tipo)

    
    if (!isNaN(documento))  { // Si no es NaN, es porque es un número correcto
        let linea_encontradas = await gestor.consultarLineaPorDueñoPorTipo(documento,tipo)

        if (linea_encontradas) 
            res.json(linea_encontradas)
        else
            res.status(400).send("La linea no fue encontrada")
    }
    else
        res.status(400).send("El parámetro debe ser numérico")

    res.end()
})


exports.router = router