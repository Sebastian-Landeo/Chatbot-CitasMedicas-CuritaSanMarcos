/*
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')
const fs = require('fs')
//Leer lo del path
const espePath = path.join(__dirname, '..', 'mensajes', 'especialidades.txt')
const especialidades = fs.readFileSync(espePath, 'utf-8')

// Diccionario de especialidades
const especialidadesDict = {
    "1": "Cardiología",
    "2": "Dermatología",
    "3": "Gastroenterología",
    "4": "Ginecología",
    "5": "Medicina General",
    "6": "Medicina Interna",
    "7": "Neumología",
    "8": "Neurología",
    "9": "Obstetricia",
    "10": "Odontología",
    "11": "Oftalmología",
    "12": "Otorrinolaringología",
    "13": "Traumatología",
    "14": "Pediatría",
    "15": "Psicología",
    "16": "Podología",
    "17": "Terapia Física y Rehabilitación",
    "18": "Urología",
    "0": "Salir"
}

const flowReservar = addKeyword(EVENTS.ACTION)
    .addAnswer('Aquí podrás reservar tus citas')
    .addAnswer(
        especialidades, // Mostrar el texto del archivo
        { capture: true },
        async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
            if (!Object.keys(especialidadesDict).includes(ctx.body)) {
                return  fallBack(
                    "Respuesta no válida, por favor selecciona una de las especialidades que se muestran."
                )
            }
            try {
                const espEscogida = especialidadesDict[ctx.body]
                if (espEscogida === "Salir") {
                    return await flowDynamic("Saliendo...")
                }
                await flowDynamic(`Seleccionaste: ${espEscogida}`)
            } catch (error) {
                console.error('Error al escoger especialidad', error)
                return fallBack('Ocurrió un error, por favor intenta nuevamente.')
            }
        }
    )

module.exports = flowReservar
*/
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')
const fs = require('fs')
const connection = require('../mysql') // Importamos la conexión a MySQL
const util = require('util')

//Para mostrar sus horarios
let diccionarioII = {}


// Promisificar la función query
const query = util.promisify(connection.query).bind(connection)

const espePath = path.join(__dirname, '..', 'mensajes', 'especialidades.txt')
const especialidades = fs.readFileSync(espePath, 'utf-8')

// Diccionario de especialidades
const especialidadesDict = {
    "1": "Cardiología",
    "2": "Dermatología",
    "3": "Gastroenterología",
    "4": "Ginecología",
    "5": "Medicina General",
    "6": "Medicina Interna",
    "7": "Neumología",
    "8": "Neurología",
    "9": "Obstetricia",
    "10": "Odontología",
    "11": "Oftalmología",
    "12": "Otorrinolaringología",
    "13": "Traumatología",
    "14": "Pediatría",
    "15": "Psicología",
    "16": "Podología",
    "17": "Terapia Física y Rehabilitación",
    "18": "Urología",
    "0": "Salir"
}

const flowReservar = addKeyword(EVENTS.ACTION)
    .addAnswer('Aquí podrás reservar tus citas')
    .addAnswer(
        especialidades, // Mostrar el texto del archivo
        { capture: true },
        async (ctx, { fallBack, flowDynamic }) => {
            if (!Object.keys(especialidadesDict).includes(ctx.body)) {
                return fallBack(
                    "Respuesta no válida, por favor selecciona una de las especialidades que se muestran."
                )
            }
            try {
                const espEscogida = especialidadesDict[ctx.body]
                if (espEscogida === "Salir") {
                    return await flowDynamic("Saliendo...")
                }

                // Realizar la consulta a la base de datos
                const rows = await query(`
                    SELECT medicos.id_medico, medicos.nombre, medicos.apellido, especialidades.nombre_especialidad AS especialidad
                    FROM medicos
                    JOIN especialidades ON medicos.id_especialidad = especialidades.id_especialidad
                    WHERE especialidades.nombre_especialidad = ?
                `, [espEscogida])

                if (rows.length === 0) {
                    await flowDynamic(`No hay médicos registrados para la especialidad: ${espEscogida}.`)
                    return
                }

                let respuesta = `Lista de médicos en ${espEscogida}:`
                rows.forEach((medico, index) => {
                    respuesta += `\n${index + 1}. ${medico.nombre} ${medico.apellido}`
                    diccionarioII[index + 1] = medico.id_medico // Agregar cada médico al diccionario
                })

                await flowDynamic(respuesta)
                
            } catch (error) {
                console.error('Error al consultar la base de datos:', error)
                return fallBack('Ocurrió un error, por favor intenta nuevamente.')
            }
        }
    )
    .addAnswer(
        "Selecciona un médico para ver sus horarios",
        { capture: true },
        async (ctx, { fallBack, flowDynamic }) => {
            // if (!Object.keys(especialidadesDict).includes(ctx.body)) {
            //     return fallBack(
            //         "Respuesta no válida, por favor selecciona una de las especialidades que se muestran."
            //     )
            // }

            try {
                const idEscogido = diccionarioII[ctx.body]
                // Realizar la consulta a la base de datos
                const horarios = await query(`
                    SELECT horarios.fecha, horarios.hora_inicio, horarios.hora_final
                    FROM medicos
                    JOIN horarios ON horarios.id_medico = medicos.id_medico
                    WHERE medicos.id_medico = ?
                `, [idEscogido])

                if (horarios.length === 0) {
                    await flowDynamic(`No hay horarios disponibles para el médico seleccionado.`)
                    return
                }

                let respuestaHorarios = `Horarios disponibles:\n`
                horarios.forEach(horario => {
                    respuestaHorarios += `\nFecha: ${horario.fecha}, Hora: ${horario.hora_inicio} - ${horario.hora_final}`
                })

                await flowDynamic(respuestaHorarios)
                
            } catch (error) {
                console.error('Error al consultar la base de datos:', error)
                return fallBack('Ocurrió un error, por favor intenta nuevamente.')
            }
        }
    )

module.exports = flowReservar