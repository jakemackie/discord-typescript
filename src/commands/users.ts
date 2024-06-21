import {
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
  EmbedBuilder,
  Client,
  User,
  userMention,
} from 'discord.js';
import { db } from '../database/db';
import { UserTable } from '../database/schema';

/**
 * Get a user by their ID
 * @param id - The ID of the user to fetch
 * @returns - The user object or null if not found
 */
async function getUserById(id: string) {
  if (!id) return;
  try {
    return db.query.UserTable.findFirst({
      where: (UserTable, { eq }) => eq(UserTable.id, id),
    });
  } catch (error) {
    return null;
  }
}

/**
 * Get all users in the database
 * @returns An array of user objects
 */
async function getUsers() {
  try {
    return await db
      .select({
        id: UserTable.id,
        username: UserTable.username,
      })
      .from(UserTable);
  } catch (error) {
    return null;
  }
}

module.exports = {
  beta: true,
  name: 'users',
  description: 'Fetch all the users in the database',
  options: [
    {
      name: 'user',
      description: 'The user to fetch',
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  execute: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const mentionedUser = interaction.options.getUser('user') as User;
    const err = await interaction.reply({
      content: 'No users found in the database',
      ephemeral: true,
    });

    const embed = new EmbedBuilder()
      .setColor('#ffffff')
      .setTimestamp()
      .setTitle('Users')
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });

    if (mentionedUser) {
      const user = await getUserById(mentionedUser.id);
      if (!user) return err;
      const { id, username } = user;

      embed.setDescription(`${userMention(id)} (${username})`);
      embed.setFooter({ text: 'Single user fetched' });
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const users = await getUsers();
    if (!users) return err;

    let description: string = '';
    for (const user of users) {
      description += `${userMention(user.id)} (${user.username})\n`;
    }

    embed.setDescription(description);
    embed.setFooter({ text: `${users.length} users fetched` });
    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
