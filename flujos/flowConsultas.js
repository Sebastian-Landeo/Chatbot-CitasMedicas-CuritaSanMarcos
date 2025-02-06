const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const flowConsultas = addKeyword(EVENTS.ACTION)
    .addAnswer('Este es el flow consultas')
    
module.exports = flowConsultas