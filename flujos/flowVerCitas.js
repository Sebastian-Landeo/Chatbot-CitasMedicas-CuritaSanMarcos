const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const flowVerCitas = addKeyword(EVENTS.ACTION)
    .addAnswer('Aquí se mostrarán tus citas programadas')

module.exports = flowVerCitas