import { CommandInteraction, Client } from 'discord.js';

module.exports = {
  beta: true,
  name: 'hi',
  description: 'hello',
  execute: async (client: Client, interaction: CommandInteraction) => {
    await interaction.reply('Hello!');
  },
};
