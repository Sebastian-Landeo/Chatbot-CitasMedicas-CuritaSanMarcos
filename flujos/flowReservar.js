const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const path = require('path')
const fs = require('fs')
const connection = require('../mysql') // Importamos la conexión a MySQL
const util = require('util')
//npm install date-fns
const { format } = require('date-fns') // Importamos la función format de date-fns
const { es } = require('date-fns/locale') // Importamos el locale español


//Diccionario que une el index e id de médico. Para mostrar sus horarios
let diccionarioII = {}
//Diccionario que une el index e id de horario. Para reservar citas
let diccionarioII2 = {}


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
    .addAnswer('📆 Aquí podrás reservar tus citas 📆')
    .addAnswer(
        especialidades, // Mostrar el texto del archivo
        { capture: true },
        async (ctx, { fallBack, flowDynamic, gotoFlow}) => {
            if (!Object.keys(especialidadesDict).includes(ctx.body)) {
                return fallBack(
                    "Respuesta no válida, por favor selecciona una de las especialidades que se muestran. 👆👆"
                )
            }
            try {
                const espEscogida = especialidadesDict[ctx.body]
                if (espEscogida === "Salir") {
                    await flowDynamic('Regresando al Menú... 🏃')
                    return gotoFlow(require(path.join(__dirname, 'menuFlow')))
                }

                // Realizar la consulta a la base de datos
                const rows = await query(`
                    SELECT medicos.id_medico, medicos.nombre, medicos.apellido, especialidades.nombre_especialidad AS especialidad
                    FROM medicos
                    JOIN especialidades ON medicos.id_especialidad = especialidades.id_especialidad
                    WHERE especialidades.nombre_especialidad = ?
                `, [espEscogida])

                if (rows.length === 0) {
                    return fallBack("`No hay médicos registrados para la especialidad 😥. Por favor selecciona otra especialidad. 👆👆")
                }

                let respuesta = `Lista de médicos en ${espEscogida} 👨‍⚕️👩‍⚕️:`
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
        "Selecciona un médico para ver sus horarios ⭐",
        { capture: true },
        async (ctx, { fallBack, flowDynamic }) => {

            if (!Object.keys(diccionarioII).includes(ctx.body)) {
                return fallBack(
                     "Respuesta no válida, por favor selecciona uno de los médicos que se muestran. 👆👆"
                )
            }

            try {
                const idEscogido = diccionarioII[ctx.body]
                // Realizar la consulta a la base de datos
                const horarios = await query(`
                    SELECT horarios.id_horario, horarios.fecha, horarios.hora_inicio, horarios.hora_final
                    FROM medicos
                    JOIN horarios ON horarios.id_medico = medicos.id_medico
                    WHERE medicos.id_medico = ?
                `, [idEscogido])

                if (horarios.length === 0) {
                    return fallBack("`El médico no esta disponible 😥. Por favor selecciona otro médico. 👆👆")
                }

                let respuestaHorarios = `Horarios disponibles 🕙: `

                // Formateando fecha
                horarios.forEach((horario, index) => {
                    const fechaFormateada = format(new Date(horario.fecha), 'dd/MM/yyyy')
                    const diaSemana = format(new Date(horario.fecha), 'EEEE', { locale: es })
                    const mes = format(new Date(horario.fecha), 'MMMM', { locale: es })
                    const diaMes = format(new Date(horario.fecha), 'd', { locale: es })
                    const horaInicioFormateada = format(new Date(`1970-01-01T${horario.hora_inicio}`), 'HH:mm')
                    const horaFinalFormateada = format(new Date(`1970-01-01T${horario.hora_final}`), 'HH:mm')
                    let diaMayuscula = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)
                    respuestaHorarios += `\n*${index + 1}. ${diaMayuscula} ${diaMes} de ${mes} (${fechaFormateada})*\nHora: ${horaInicioFormateada} - ${horaFinalFormateada}`
                    diccionarioII2[index + 1] = horario.id_horario // Agregar cada horario al diccionario
                })

                await flowDynamic(respuestaHorarios)
                
            } catch (error) {
                console.error('Error al consultar la base de datos:', error)
                return fallBack('Ocurrió un error, por favor intenta nuevamente.')
            }
        }
    )
    .addAnswer(
        "Selecciona un horario para reservar tu cita ⭐",
        { capture: true },
        async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
            
            if (!Object.keys(diccionarioII2).includes(ctx.body)) {
                return fallBack(
                     "Respuesta no válida, por favor selecciona uno de los horarios que se muestran. 👆👆"
                )
            }

            try {
                const idEscogido = diccionarioII2[ctx.body]
                // Realizar la consulta a la base de datos
                const horarios = await query(`
                    INSERT INTO citas (id_paciente, id_atencion, estado) 
                    VALUES (1, ?, 'Reservado');
                `, [idEscogido])

                if (horarios.length === 0) {
                    return fallBack("Reserva no disponible. ❌. Por favor, seleccione otro horario")
                }

                await flowDynamic("Cita reservada exitosamente. ✅")
                await flowDynamic('Regresando al Menú... 🏃')
                return gotoFlow(require(path.join(__dirname, 'menuFlow')))
                
            } catch (error) {
                console.error('Error al consultar la base de datos:', error)
                return fallBack('Ocurrió un error, por favor intenta nuevamente.')
            }
        }
    )

module.exports = flowReservar