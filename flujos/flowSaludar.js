const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')

const flowSaludar = addKeyword(EVENTS.ACTION)
        .addAnswer('🙌 Hola bienvenido, soy el Curita Bot')
        .addAnswer('Y estoy dispuesto a ayudarte con tus citas en la Clínica San Marcos', {
            media: path.join(__dirname, '..', 'Imagenes', 'clinica.png')
        })
        .addAnswer('Escriba su correo de paciente para iniciar', { capture: true }, //No olvdiar el capture
            async (ctx, { flowDynamic, fallBack }) => {
                try {
                    const email = ctx.body.trim()
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
                    if (!emailRegex.test(email)) {
                        return fallBack('Por favor, proporcione un correo electrónico válido.')
                    }
    
                    if (email.endsWith('@unmsm.edu.pe')) {
                        return await flowDynamic('Escriba su código de institución')
                        //Enviar menú de opciones
                    } else {
                        const username = email.split('@')[0]
                        await flowDynamic(`Bienvenido paciente ${username}`)
                        //Enviar menú de opciones
                    }
                    // Por arreglar, este mensaje no sale para @unmsm.edu.pe <-------------------
                    return await flowDynamic(`Para ver las opciones disponibles, escribe *Menu* 👩‍⚕️👨‍⚕️`)
                } catch (error) {
                    console.error('Error en la validación del correo:', error)
                    return fallBack('Ocurrió un error, por favor intenta nuevamente.')
                }
            }
        )
module.exports = flowSaludar