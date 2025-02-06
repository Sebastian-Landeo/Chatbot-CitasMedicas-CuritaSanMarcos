const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const flowReservar = addKeyword(EVENTS.ACTION)
    .addAnswer('Este es el flow reservar')

module.exports = flowReservar