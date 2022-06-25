//el gestor en donde estaran las funciones 
// aca tengo el llamo de la base datos
const mariadb = require('mariadb');
const config = require("../Config/bd");

//ABM de Telefonos
async function agregarLinea(nueva) {
    const conn = await mariadb.createConnection(config)
    const linea = [nueva.id_telefono,nueva.numero,nueva.id_tipo,nueva.documento]
    await conn.query("INSERT INTO telefonos(id_telefono, numero, id_tipo, documento) value(?,?,?,?)",linea)
    conn.end()
}
async function consultarTodasLasLineas() {
    const conn = await mariadb.createConnection(config)
    let lineas = await conn.query("SELECT * FROM telefonos")
    conn.end()
    return lineas

}
async function consultarLinea(num) {
    const conn = await mariadb.createConnection(config)
    let linea = await conn.query("SELECT * FROM telefonos WHERE id_telefono = ?", [num])
    conn.end()
    return linea[0]
}
async function editarLinea(linea) {
    const conn = await mariadb.createConnection(config)
    let valores = [linea.id_telefono, linea.numero, linea.id_tipo, linea.documento]
    // await conn.query()
    conn.end()
    return valores
}
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