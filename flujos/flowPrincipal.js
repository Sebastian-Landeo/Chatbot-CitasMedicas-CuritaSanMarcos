const { addKeyword } = require('@bot-whatsapp/bot')

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido, soy el Curita Bot')
    .addAnswer('Y estoy dispuesto a ayudarte con tus citas en Curita San Marcos')

module.exports = flowPrincipal