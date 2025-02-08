const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSaludar = require('./flujos/flowSaludar')
const flowWelcome = require('./flujos/flowWelcome')
const flowVerCitas = require('./flujos/flowVerCitas')
const flowReservar = require('./flujos/flowReservar')
const flowConsultas = require('./flujos/flowConsultas')
const menuFlow = require('./flujos/menuFlow')

const main = async () => {
    try {
        const adapterDB = new MockAdapter()
        const adapterFlow = createFlow([flowSaludar, flowWelcome, 
            menuFlow, flowConsultas, flowReservar, flowVerCitas])
        const adapterProvider = createProvider(BaileysProvider)

        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        })

        QRPortalWeb()
    } catch (error) {
        console.error('Error en la función main:', error)
    }
}

main().catch(error => {
    console.error('Error no manejado:', error)
}) 