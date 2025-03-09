const { addKeyword } = require('@bot-whatsapp/bot')
const path = require('path')
//Leer lo del path
const fs = require('fs')

const menuPath = path.join(__dirname, '..', 'mensajes', 'menu.txt')
const menu = fs.readFileSync(menuPath, 'utf-8')

const menuFlow = addKeyword("Menu").addAnswer(
    menu, //Mostrar el texto del archivo
    { capture: true }, //para captar la respuesta del usuario
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!["1", "2", "3", "0"].includes(ctx.body)) {
            return fallBack(
                "Respuesta no válida, por favor selecciona una de las opciones."
            )
        }
        try {
            switch (ctx.body) {
                case "1":
                    return gotoFlow(require(path.join(__dirname, 'flowReservar')))
                case "2":
                    return gotoFlow(require(path.join(__dirname, 'flowVerCitas')))
                case "3":
                    return gotoFlow(require(path.join(__dirname, 'flowConsultas')))
                case "0":
                    return await flowDynamic(
                        "Saliendo... Puedes volver a acceder a este menú escribiendo *Menu*"
                    )
            }
        } catch (error) {
            console.error('Error en el switch del menú:', error)
            return fallBack('Ocurrió un error, por favor intenta nuevamente.')
        }
    }
)

module.exports = menuFlow