const express = require('express')
const gestor = require('../Gestor/gestorDataBases')
const router = express.Router()


router.use(express.json())

//ABM de Telefono
// * post crear linea
router.post("/", async(req, res)=>{
    let nuevaLinea = req.body    
    let agregado = await gestor.agregarLinea(nuevaLinea)
    if(agregado){
        res.status(200).send("Linea insertada")
    }else{
        res.status(400).send("El valor ya existe en la base de datos")
    }
    res.end()

})

//Traer todas las lineas
router.get("/", async(req, res) => {
    if(req.query.sufijo){
        let num = req.query.sufijo;
            let linea_encontrada = await gestor.consultarSufijo(num)
    
            if (linea_encontrada) 
                res.json(linea_encontrada)
            else
                res.status(400).send("La linea no fue encontrada")

    }else{
        res.json(await  gestor.consultarTodasLasLineas())
    }
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
    if (!isNaN(linea)) {
        let lineaNueva = req.body
        lineaNueva.id_telefono = linea
        let linea_encontrada  = await gestor.consultarLinea(linea)
        if (linea_encontrada) {
            let linea_editada = await gestor.editarLinea(lineaNueva)
            if (linea_editada) {
                res.status(200).send("La linea fue editada")
            } else {                
                res.status(400).send("Error en la edición")
            }
        } else {
            res.status(404).send("La linea ingresada no existe")
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

exports.router = router