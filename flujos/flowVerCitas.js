const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
//npm install date-fns
const { format } = require('date-fns') // Importamos la función format de date-fns
const { es } = require('date-fns/locale') // Importamos el locale español
//sql
const connection = require('../mysql') // Importamos la conexión a MySQL
const util = require('util')
// Promisificar la función query
const query = util.promisify(connection.query).bind(connection)
let telefono = ''

const flowVerCitas = addKeyword(EVENTS.ACTION)
    // pon null si NO esperas una respuesta
    .addAnswer('Aquí podrás ver tus citas pendientes', null, async (ctx, { flowDynamic }) => {
        try {
            telefono = String(ctx.from)
            telefono2 = telefono
            console.log('Telefono2', telefono2);
            const horarios = await query(`
                SELECT horarios.fecha, horarios.hora_inicio, horarios.hora_final FROM usuarios
                JOIN citas ON citas.id_paciente = usuarios.id_usuario
                JOIN horarios ON citas.id_atencion = horarios.id_horario
                WHERE citas.estado = 'Reservado' AND usuarios.telefono = ?;
            `, [telefono2]);

            if (horarios.length === 0) {
                return await flowDynamic('No tienes citas pendientes.');
            }

            let respuestaHorarios = 'Reservados: ';

            horarios.forEach((horario, index) => {
                const fechaFormateada = format(new Date(horario.fecha), 'dd/MM/yyyy');
                const diaSemana = format(new Date(horario.fecha), 'EEEE', { locale: es });
                const mes = format(new Date(horario.fecha), 'MMMM', { locale: es });
                const diaMes = format(new Date(horario.fecha), 'd', { locale: es });
                const horaInicioFormateada = format(new Date(`1970-01-01T${horario.hora_inicio}`), 'HH:mm');
                const horaFinalFormateada = format(new Date(`1970-01-01T${horario.hora_final}`), 'HH:mm');
                let diaMayuscula = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
                respuestaHorarios += `\n*${index + 1}. ${diaMayuscula} ${diaMes} de ${mes} (${fechaFormateada})*\nHora: ${horaInicioFormateada} - ${horaFinalFormateada}`;
            });

            await flowDynamic(respuestaHorarios);

        } catch (error) {
            console.error('Error al consultar la base de datos:', error);
            await flowDynamic('Hubo un error al recuperar los datos. Por favor, inténtalo de nuevo más tarde.');
        }
    });

module.exports = flowVerCitas;
