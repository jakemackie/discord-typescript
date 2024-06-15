import { CommandInteraction, Client } from 'discord.js';

module.exports = {
  beta: true,
  name: 'ping',
  description: 'Show the bots current latency',
  execute: async (client: Client, interaction: CommandInteraction) => {
    await interaction.reply(`${client.ws.ping}ms`);
  },
};
