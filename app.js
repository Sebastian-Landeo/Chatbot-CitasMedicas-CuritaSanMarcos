const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')
const fs = require('fs')

// Usar menu que se encuentre en la carpeta mensajes
const menuPath = path.join(__dirname, 'mensajes', 'menu.txt')
const menu = fs.readFileSync(menuPath, 'utf-8')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { delay } = require('@whiskeysockets/baileys')

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido, soy el Curita Bot')
    .addAnswer('Y estoy dispuesto a ayudarte con tus citas en Curita San Marcos') 

const flowMenuRest = addKeyword(EVENTS.ACTION)
    .addAnswer('Este es el flow menu')

const flowReservar = addKeyword(EVENTS.ACTION)
    .addAnswer('Este es el flow reservar')

const flowConsultas = addKeyword(EVENTS.ACTION)
    .addAnswer('Este es el flow consultas')

const flowWelcome = addKeyword(EVENTS.WELCOME)
.addAnswer("Este es el flujo Welcome", {
    delay: 1000,
    media: path.join(__dirname, 'Imagenes', 'clinica.png')
},
    // Contexto, contextoFront(numero de telefono y nombre)
    async(ctx, ctxFn) => {
        console.log(ctx.body) // Recoge los mensajes del usuario
        //Usar el flujo dinamico con un if
        if (ctx.body.includes("Casas")) {
            await ctxFn.flowDynamic("Escribiste casas")
        } else {
            await ctxFn.flowDynamic("Escribiste otra cosa")
        }
    } 
)

const menuFlow = addKeyword("Menu").addAnswer(
    menu,
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
      if (!["1", "2", "3", "0"].includes(ctx.body)) {
        return fallBack(
          "Respuesta no válida, por favor selecciona una de las opciones."
        );
      }
      
      //goToFlow("flow..."): Para in entre flujos
      switch (ctx.body) {
        case "1":
          return gotoFlow("flowMenuRest");
        case "2":
          return gotoFlow("flowReservar");
        case "3":
          return gotoFlow("flowConsultas");
        case "0":
          return await flowDynamic(
            "Saliendo... Puedes volver a acceder a este menú escribiendo '*Menu*'"
          );
      }
    }
  );
  
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowWelcome, menuFlow, 
      flowConsultas, flowReservar, flowMenuRest])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
