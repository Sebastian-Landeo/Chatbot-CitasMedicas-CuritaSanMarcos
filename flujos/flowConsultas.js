const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const chat = require('../gemini') // Importamos la función chat de Gemini
require('dotenv').config() // Importamos las variables de entorno
//Texto del prompt
const path = require('path')
const fs = require('fs')
const consultasPath = path.join(__dirname, '..', 'mensajes', 'promptConsultas.txt')
const promptConsultas = fs.readFileSync(consultasPath, 'utf-8')


const flowConsultas = addKeyword(EVENTS.ACTION)
    .addAnswer('Realiza tu consulta', { capture: true }, async (ctx, ctxFn) => {
        const prompt = promptConsultas
        const consulta = ctx.body
        const answer = await chat(prompt, consulta)
        await ctxFn.flowDynamic(answer)
    })
    .addAnswer(
      "Quieres continuar con otra consulta?`\n1. Sí\n2. No",
      { capture: true },
      async (ctx, { fallBack, flowDynamic, gotoFlow}) => {
        const respuesta = ctx.body
        if (respuesta === '1' || respuesta.toLowerCase() === 'sí' || respuesta.toLowerCase() === 'si') {
            return gotoFlow(flowConsultas)
        } else if (respuesta === '2' || respuesta.toLowerCase() === 'no') {
            await flowDynamic('Escriba *Menu* para escoger otra opción.')
        } else {
            return fallBack('Respuesta no válida, por favor selecciona 1 para Sí o 2 para No.')
        }
      }
    )

module.exports = flowConsultas