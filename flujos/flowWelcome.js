const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')

const userStates = {} // Objeto global para almacenar estados de los usuarios

const flowWelcome = addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, { gotoFlow, flowDynamic }) => {
        const userId = ctx.from // Identificador único del usuario
        
        // Inicializar estado del usuario si no existe
        if (!userStates[userId]) {
            userStates[userId] = { hasWelcomed: false }
        }

        if (userStates[userId].hasWelcomed) {
            await flowDynamic('Regresando al Menú... 🏃')
            return gotoFlow(require(path.join(__dirname, 'menuFlow')))
        }
        
        userStates[userId].hasWelcomed = true
        return gotoFlow(require(path.join(__dirname, 'flowSaludar')))
    }) 

module.exports = flowWelcome


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