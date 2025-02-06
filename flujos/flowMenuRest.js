const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const flowMenuRest = addKeyword(EVENTS.ACTION)
    .addAnswer('Este es el flow menu')

module.exports = flowMenuRest