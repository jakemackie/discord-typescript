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
 * @param id The ID of the user to fetch
 * @returns The user object or null if not found
 */
async function getUserById(id: string) {
  // Don't query if parameter is empty
  if (!id) return;

  // Query the database for a single user record
  const user = db.query.UserTable.findFirst({
    where: (UserTable, { eq }) => eq(UserTable.id, id),
  });

  // Return the result
  return user;
}

/**
 * Get all users in the database
 * @returns An array of user objects
 */
async function getUsers() {
  // Query the database for all user records
  const users = await db
    .select({
      id: UserTable.id,
      username: UserTable.username,
    })
    .from(UserTable);

  // Return the result
  return users;
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
    // Assign the Command Option(s)
    const user = interaction.options.getUser('user') as User;

    // Build the base embed
    const embed = new EmbedBuilder()
      .setColor('#ffffff')
      .setTimestamp()
      .setTitle('Users')
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });

    // If a user is specified, fetch the user from the database (single user)
    if (user) {
      // Attempt to fetch the user from the database
      const result = await getUserById(user.id);

      // If the user is not found, return an error message
      if (!result)
        return interaction.reply({
          content: `User: ${userMention(user.id)} not found in the database`,
          ephemeral: true,
        });

      // If the user is found, add the user's information to the embed
      const { id, username } = result;

      embed.setDescription(`${userMention(id)} (${username})`);
      embed.setFooter({ text: 'Single user fetched' });

      // Send the embed
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // If no user is specified, fetch all users from the database (multiple users)
    const users = await getUsers();

    // If no users are found, return an error message
    if (!users)
      return interaction.reply({
        content: 'No users found in the database',
        ephemeral: true,
      });

    // If users are found, add the user's information to the embed
    let description: string = '';
    for (const user of users) {
      description += `${userMention(user.id)} (${user.username})\n`;
    }
    embed.setDescription(description);
    embed.setFooter({ text: `${users.length} users fetched` });

    // Send the embed
    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
