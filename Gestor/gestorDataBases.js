//el gestor en donde estaran las funciones 
// aca tengo el llamo de la base datos
const mariadb = require('mariadb');
const config = require("../Config/bd");

//ABM de Telefonos
async function verificar(comprovacion) {
    const conn = await mariadb.createConnection(config)
    let linea = await conn.query("SELECT COUNT(*) as resultado FROM telefonos WHERE numero = ?", [comprovacion]);    
    let resultado = parseInt(linea[0].resultado)
    console.log(resultado);
    conn.end()
    return resultado
}
//agragar nueva linea
async function agregarLinea(nuevaLinea) {
    const conn = await mariadb.createConnection(config)
    let comprovacion = [nuevaLinea.numero]       
    let linea =await verificar(comprovacion);

    if (linea == 0 ) {   
        const agregar = [nuevaLinea.numero,nuevaLinea.id_tipo,nuevaLinea.documento];
        await conn.query("INSERT INTO telefonos( numero, id_tipo, documento) value(?,?,?)",agregar);
    } else { 
        conn.end()           
        return false;
    }
   
    conn.end()         
    return true
}
//consultar todas las lineas
async function consultarTodasLasLineas() {
    const conn = await mariadb.createConnection(config)
    let lineas = await conn.query("SELECT * FROM telefonos")
    conn.end()
    return lineas

}
//consultar linea
async function consultarLinea(num) {
    const conn = await mariadb.createConnection(config)
    let linea = await conn.query("SELECT * FROM telefonos WHERE id_telefono = ?", [num])
    conn.end()
    return linea[0]
}
//editar linea 
async function editarLinea(linea) {
    const conn = await mariadb.createConnection(config)
    let comprovacion = parseInt([linea.numero])     
    let encontrada =await verificar(comprovacion);
    if (encontrada) {            
        const modificar = [ linea.numero, linea.id_tipo, linea.documento,linea.id_telefono];            
        await conn.query("UPDATE telefonos SET numero = ?,id_tipo= ?,documento=? WHERE id_telefono = ?",modificar);
    } else {  
        console.log("Falla el if del encontrado");          
        conn.end()           
        return false;
    }
    conn.end()
    return true
}
//Eliminar linea
async function eliminarLinea(num) {
    const conn = await mariadb.createConnection(config)
    let linea = await conn.query("SELECT * FROM telefonos WHERE id_telefono = ?", [num])
    await conn.query("DELETE FROM telefonos WHERE id_telefono = ?",[num])
    conn.end()
    return linea[0]
}


// //Relación entre personas y telefonos
// async function consultarLineaPorDueño(nueva) {
//     const conn = await mariadb.createConnection(config)
//     await conn.query()
//     conn.end()
// }
// async function consultarLineaPorDueñoPorTipo(nueva) {
//     const conn = await mariadb.createConnection(config)
//     await conn.query()
//     conn.end()
// }


// // Búsquedas
// async function consultarSufijo(nueva) {
//     const conn = await mariadb.createConnection(config)
//     await conn.query()
//     conn.end()
// }
// async function consultarFiltroNombreApellido(nueva) {
//     const conn = await mariadb.createConnection(config)
//     await conn.query()
//     conn.end()
// }


exports.agregarLinea = agregarLinea
exports.consultarTodasLasLineas = consultarTodasLasLineas
exports.consultarLinea = consultarLinea
exports.editarLinea = editarLinea
exports.eliminarLinea = eliminarLinea