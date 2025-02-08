const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const flowConsultas = addKeyword(EVENTS.ACTION)
    .addAnswer('Aquí podrás hacer tus consultas')
    
    
module.exports = flowConsultas