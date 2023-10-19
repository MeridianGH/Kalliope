import { logging } from '../utilities/logging.js'
import { WebSocket } from '../utilities/websocket.js'

export let iconURL
export const { data, execute } = {
  data: { name: 'ready', once: true },
  async execute(client) {
    const now = new Date()
    const date = now.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' - ' + now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    logging.success(`${client.user.tag} connected to Discord at ${date}`)
    iconURL = client.user.displayAvatarURL()
    client.websocket = new WebSocket(client)
    client.websocket.initialize()
  }
}
