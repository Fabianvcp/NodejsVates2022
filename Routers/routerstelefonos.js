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
//Traer todas las lineas
router.get("/", async(req, res)=>{
    res.json(await gestor.consultarTodasLasLineas)
    res.end()
})
//traer solo la linea solicitada
router.get("/:linea", async (req, res) => {
    let num = parseInt(req.params.linea)
    
    if (!isNaN(num))  { // Si no es NaN, es porque es un número correcto
        let linea_encontrada = await gestor.consultarLinea(num)

        if (linea_encontrada) 
            res.json(linea_encontrada)
        else
            res.status(400).send("La linea no fue encontrada")
    }
    else
        res.status(400).send("El parámetro debe ser numérico")

    res.end()
})

//editar datos de la linea
router.put("/:linea", async(req, res)=>{
    let linea = parseInt(req.params.linea)    
    if (!isNaN(num)) {
        let lineaNueva = req.body
        lineaNueva.id_telefono = num
        let linea_encontrada  = await gestor.consultarLinea(num)

        if (linea_encontrada) {
            await gestor.editarLinea(lineaNueva)
            res.sendStatus(200).send("La linea fue editada")
        } else {
            res.status(400).send("La linea ingresada no existe")
        }
    } else {
        res.status(400).send("El parámetro debe ser numérico")
        
    }

    
})

router.delete("/:linea", async(req, res)=>{
    let num = parseInt(req.params.linea)
    
    if (!isNaN(num))  { // Si no es NaN, es porque es un número correcto
        let linea_encontrada = await gestor.consultarLinea(num)

        if (linea_encontrada){

            let linea_eliminada = await gestor.eliminarLinea(num)
            res.json(linea_eliminada)
        }else{
            res.status(400).send("La linea no fue encontrada")
        }
    }
    else
        res.status(400).send("El parámetro debe ser numérico")

    res.end()
})

// Relación entre personas y telefonos

// Búsquedas