const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')

const flowWelcome = addKeyword(EVENTS.WELCOME)
    .addAnswer('🙌 Hola bienvenido, soy el Curita Bot')
    .addAnswer('Y estoy dispuesto a ayudarte con tus citas en Curita San Marcos', {
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
                    await flowDynamic('Escriba su código de alumno')
                } else {
                    const username = email.split('@')[0]
                    await flowDynamic(`Bienvenido paciente ${username}`)
                }
            } catch (error) {
                console.error('Error en la validación del correo:', error)
                return fallBack('Ocurrió un error, por favor intenta nuevamente.')
            }
        }
    )

   /*  .addAnswer("Y estoy dispuesto a ayudarte con tus citas en Curita San Marcos", {
        media: path.join(__dirname, 'Imagenes', 'clinica.png')
    },
    async(ctx, ctxFn) => {
        console.log(ctx.body) // Recoge los mensajes del usuario
        if (ctx.body.includes("Casas")) {
            await ctxFn.flowDynamic("Escribiste casas")
        } else {
            await ctxFn.flowDynamic("Escribiste otra cosa")
        }
    }) */

    

module.exports = flowWelcome