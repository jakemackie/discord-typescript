import { CommandInteraction, Client } from 'discord.js';
import { db } from '../database/db';
import { UserTable } from '../database/schema';

module.exports = {
  beta: true,
  name: 'register',
  description: 'Add yourself to the database!',
  execute: async (client: Client, interaction: CommandInteraction) => {
    try {
      await db.insert(UserTable).values({
        id: interaction.user.id,
        username: interaction.user.username,
      });
      await interaction.reply(`You've been added to the database!`);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while adding you to the database!',
        ephemeral: true,
      });
    }
  },
};
