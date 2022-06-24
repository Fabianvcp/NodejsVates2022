const express = require('express')
const gestor = require('../Gestor/gestorDataBases')
const router = express.Router()

router.use(express.json())

//ABM de Telefono
// * post crear linea
router.post("/", async(req, res)=>{
    let nuevaLinea = req.body
    let linea = nuevaLinea['id_telefono']
    let telefono_encontrado = await gestor.consultarLinea(linea)
    
    if(telefono_encontrado){
        res.sendStatus(406).send("El valor ya existe en la base de datos")
    }else{
        await gestor.agregarLinea(nuevaLinea)
        res.sendStatus(201).send("Linea insertada")

    }
    res.end()

})

router.get("/", async(req, res)=>{
    res.json(await gestor.consultarTodasLasLineas)
    res.end()
})


router.put("/:linea", async(req, res)=>{
    
})

router.delete("/:linea", async(req, res)=>{
    
})

// Relación entre personas y telefonos

// Búsquedas