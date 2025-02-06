const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')

const flowWelcome = addKeyword(EVENTS.WELCOME)
    .addAnswer("Este es el flujo Welcome", {
        delay: 1000,
        media: path.join(__dirname, 'Imagenes', 'clinica.png')
    },
    async(ctx, ctxFn) => {
        console.log(ctx.body) // Recoge los mensajes del usuario
        if (ctx.body.includes("Casas")) {
            await ctxFn.flowDynamic("Escribiste casas")
        } else {
            await ctxFn.flowDynamic("Escribiste otra cosa")
        }
    })

module.exports = flowWelcome