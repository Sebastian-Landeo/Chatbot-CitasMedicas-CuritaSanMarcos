const { addKeyword } = require('@bot-whatsapp/bot')
const path = require('path')
const fs = require('fs')

const menuPath = path.join(__dirname, '..', 'mensajes', 'menu.txt')
const menu = fs.readFileSync(menuPath, 'utf-8')

const menuFlow = addKeyword("Menu").addAnswer(
    menu,
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!["1", "2", "3", "0"].includes(ctx.body)) {
            return fallBack(
                "Respuesta no válida, por favor selecciona una de las opciones."
            )
        }

        try {
            switch (ctx.body) {
                case "1":
                    return gotoFlow(require(path.join(__dirname, 'flowMenuRest')))
                case "2":
                    return gotoFlow(require(path.join(__dirname, 'flowReservar')))
                case "3":
                    return gotoFlow(require(path.join(__dirname, 'flowConsultas')))
                case "0":
                    return await flowDynamic(
                        "Saliendo... Puedes volver a acceder a este menú escribiendo '*Menu*'"
                    )
            }
        } catch (error) {
            console.error('Error en el switch del menú:', error)
            return fallBack('Ocurrió un error, por favor intenta nuevamente.')
        }
    }
)

module.exports = menuFlow