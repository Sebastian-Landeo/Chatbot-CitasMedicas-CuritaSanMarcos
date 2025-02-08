const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')
//Leer lo del path
const fs = require('fs')
const espePath = path.join(__dirname, '..', 'mensajes', 'especialidades.txt')
const especialidades = fs.readFileSync(espePath, 'utf-8')

const flowReservar = addKeyword(EVENTS.ACTION)
    .addAnswer('Aquí podras reservar tus citas')
    .addAnswer(
        especialidades, //Mostrar el texto del archivo
        { capture: true },
        async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
            if (!["1", "2", "3", "0", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
                .includes(ctx.body)) {
                return fallBack(
                    "Respuesta no válida, por favor selecciona una de las especialidades que se muestran."
                )
            }
            try {
                opcion = ctx.body
                switch (opcion) {
                    case "1":
                        espEscogida = "Cardiología";
                        break;
                    case "2":
                        espEscogida = "Dermatología";
                        break;
                    case "3":
                        espEscogida = "Gastroenterología";
                        break;
                    case "4":
                        espEscogida = "Ginecología";
                        break;
                    case "5":
                        espEscogida = "Medicina General";
                        break;
                    case "6":
                        espEscogida = "Medicina Interna";
                        break;
                    case "7":
                        espEscogida = "Neumología";
                        break;
                    case "8":
                        espEscogida = "Neurología";
                        break;
                    case "9":
                        espEscogida = "Obstetricia";
                        break;
                    case "10":
                        espEscogida = "Odontología";
                        break;
                    case "11":
                        espEscogida = "Oftalmología";
                        break;
                    case "12":
                        espEscogida = "Otorrinolaringología";
                        break;
                    case "13":
                        espEscogida = "Traumatología";
                        break;
                    case "14":
                        espEscogida = "Pediatría";
                        break;
                    case "15":
                        espEscogida = "Psicología";
                        break;
                    case "16":
                        espEscogida = "Podología";
                        break;
                    case "17":
                        espEscogida = "Terapia Física y Rehabilitación";
                        break;
                    case "18":
                        espEscogida = "Urología";
                        break;
                    case "0":
                        return await flowDynamic(
                            "Saliendo..."
                        )
                }
                await flowDynamic(`Seleccionaste: ${espEscogida}`)
            } catch (error) {
                console.error('Error al escoger especialidad', error)
                return fallBack('Ocurrió un error, por favor intenta nuevamente.')
            }
        }
    )
    

module.exports = flowReservar