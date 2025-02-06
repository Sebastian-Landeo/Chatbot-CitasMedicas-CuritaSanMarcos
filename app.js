const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { delay } = require('@whiskeysockets/baileys')

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido, soy el Curita Bot')
    .addAnswer('Y estoy dispuesto a ayudarte con tus citas en Curita San Marcos') 

const flowWelcome = addKeyword(EVENTS.WELCOME)
.addAnswer("Este es el flujo Welcome", {
    delay: 1000,
    media: path.join(__dirname, 'Imagenes', 'clinica.png')
},
    // Contexto, contextoFront(numero de telefono y nombre)
    async(ctx, ctxFn) => {
        console.log(ctx.body) // Recoge los mensajes del usario
        //Usar el flujo dinamico con un if
        if (ctx.body.includes("Casas")) {
            await ctxFn.flowDynamic("Escribiste casas")
        } else {
            await ctxFn.flowDynamic("Escribiste otra cosa")
        }
    } 
)

const menuFlow = addKeyword("Menu").addAnswer(
    "Este es el menú, elige opción 1,2,3,4,5 o 0",
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
      if (!["1", "2", "3", "4", "5", "0"].includes(ctx.body)) {
        return fallBack(
          "Respuesta no válida, por favor selecciona una de las opciones."
        );
      }
  
      switch (ctx.body) {
        case "1":
          return await flowDynamic("Esta es la opción 1");
        case "2":
          return await flowDynamic("Esta es la opción 2");
        case "3":
          return await flowDynamic("Esta es la opción 3");
        case "4":
          return await flowDynamic("Esta es la opción 4");
        case "5":
          return await flowDynamic("Esta es la opción 5");
        case "0":
          return await flowDynamic(
            "Saliendo... Puedes volver a acceder a este menú escribiendo '*Menu*'"
          );
      }
    }
  );
  
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowWelcome, menuFlow])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
