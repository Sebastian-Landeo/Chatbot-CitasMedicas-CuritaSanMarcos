const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const connection = require('../mysql') // Importamos la conexión a MySQL
const util = require('util')

// Promisificar la función query
const query = util.promisify(connection.query).bind(connection)

const flowConsultas = addKeyword(EVENTS.ACTION)
  .addAnswer('Aquí podrás hacer tus consultas', null, async (ctx, { flowDynamic }) => {
    try {
      console.log('Ejecutando consulta SQL...')

      const rows = await query('SELECT * FROM medicos')

      if (rows.length === 0) {
        await flowDynamic('No hay médicos registrados.')
        return
      }

      let respuesta = 'Lista de médicos:\n'
      rows.forEach(medico => {
        respuesta += `👨‍⚕️ ${medico.nombre} ${medico.apellido}\n`
      })

      await flowDynamic(respuesta)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error)
      await flowDynamic('Hubo un error al recuperar los datos. Por favor, inténtalo de nuevo más tarde.')
    }
  })

module.exports = flowConsultas