const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')
//Para las querys
const connection = require('../mysql') // Importamos la conexión a MySQL
const util = require('util')
const query = util.promisify(connection.query).bind(connection)

const flowSaludar = addKeyword(EVENTS.ACTION)
        .addAnswer('🙌 Hola bienvenido, soy el Curita Bot 💊🤖')
        .addAnswer('🙋‍♀️ Y estoy dispuesto a ayudarte con tus citas en la Clínica San Marcos 🙋‍♂️', {
            media: path.join(__dirname, '..', 'Imagenes', 'clinica.png')
        })
        .addAnswer('Escriba su correo de paciente para iniciar ✉️', { capture: true }, //No olvdiar el capture
            async (ctx, { flowDynamic, fallBack }) => {
                try {
                    const correo = ctx.body

                    // Realizar la consulta a la base de datos
                    const rows = await query(`
                        SELECT SUBSTRING_INDEX(nombres, ' ', 1) AS primer_nombre
                        FROM usuarios
                        WHERE correo = ?
                    `, [correo])
    
                    if (rows.length === 0) {
                        return fallBack('El correo no es válido 😥\nPor favor, ingrese un correo válido 🩺')
                    }

                } catch (error) {
                    console.error('Error al consultar la base de datos:', error)
                    return fallBack('Ocurrió un error, por favor intenta nuevamente.')
                }
            }
        )
        .addAnswer('Escriba su código de san marcos 🔢', { capture: true }, //No olvdiar el capture
            async (ctx, { flowDynamic, fallBack, gotoFlow}) => {
                try {
                    const codigo = ctx.body

                    // Realizar la consulta a la base de datos
                    const rows = await query(`
                        SELECT SUBSTRING_INDEX(nombres, ' ', 1) AS primer_nombre,
                        codigo 
                        FROM usuarios
                        WHERE codigo = ?
                    `, [codigo])
    
                    if (rows.length === 0) {
                        return fallBack('El código no es válido 😥\nPor favor, ingrese un código válido. 🩺')
                    }

                    await flowDynamic('Bienvenido ' + rows[0].primer_nombre + ', ¿En qué puedo ayudarte? 🤗')
                    // Enviar mensaje para ver las opciones disponibles
                    return gotoFlow(require(path.join(__dirname, 'menuFlow')))
                    //return await flowDynamic(`Para ver las opciones disponibles, escribe *Menu* 👩‍⚕️👨‍⚕️`)

                } catch (error) {
                    console.error('Error al consultar la base de datos:', error)
                    return fallBack('Ocurrió un error, por favor intenta nuevamente.')
                }
            }
        )

        
module.exports = flowSaludar;