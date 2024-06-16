import { CommandInteraction, Client, User } from 'discord.js';
import { db } from '../database/db';
import { UserTable } from '../database/schema';

module.exports = {
  beta: true,
  name: 'users',
  description: 'See all the users in the database',
  execute: async (client: Client, interaction: CommandInteraction) => {
    try {
      const result = await db.select({
        username: UserTable.username,
        id: UserTable.id,
      }).from(UserTable)
      const { username, id } = result[0];
      await interaction.reply(`${username} (${id})`);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while fetching the users!', ephemeral: true });
    }
  },
};
