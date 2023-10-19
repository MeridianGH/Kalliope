import { SlashCommandBuilder } from 'discord.js'
import { genericChecks } from '../utilities/checks.js'
import { errorEmbed, simpleEmbed } from '../utilities/utilities.js'

export const { data, execute } = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Removes the specified track from the queue.')
    .addIntegerOption((option) => option.setName('track').setDescription('The track to remove.').setRequired(true)),
  async execute(interaction) {
    await genericChecks(interaction)
    const player = interaction.client.lavalink.getPlayer(interaction.guild.id)

    const index = interaction.options.getInteger('track')
    if (index < 1 || index > player.queue.tracks.length) { return await interaction.reply(errorEmbed(`You can only specify a song number between 1-${player.queue.tracks.length}.`, true)) }
    const track = player.queue.splice(index - 1, 1)[0]
    await interaction.reply(simpleEmbed(`🗑️ Removed track \`#${index}\`: **${track.info.title}**`))
    interaction.client.websocket.updatePlayer(player)
  }
}
