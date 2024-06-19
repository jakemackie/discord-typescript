import 'dotenv/config';
import {
  Client,
  ApplicationCommandData,
  GuildApplicationCommandManager,
} from 'discord.js';

module.exports = async (client: Client) => {
  console.log(`${client.user?.username} is online.`);

  const guildId = process.env.GUILD_ID as string;
  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    console.error('Guild not found');
    return;
  }

  const globalCommands: ApplicationCommandData[] = [];
  const guildCommands: ApplicationCommandData[] = [];

  client.commands.forEach((command) => {
    if (command.beta) {
      console.log(`Registering beta command: ${command.name}`);
      guildCommands.push(command);
    } else {
      console.log(`Registering global command: ${command.name}`);
      globalCommands.push(command);
    }
  });

  // Register global commands
  try {
    await client.application?.commands.set(globalCommands);
    console.log(
      `Successfully registered ${globalCommands.length} global commands.`,
    );
  } catch (error) {
    console.error('Error registering global application commands:', error);
  }

  // Register guild-specific commands
  try {
    await (guild.commands as GuildApplicationCommandManager).set(guildCommands);
    console.log(
      `Successfully registered ${guildCommands.length} guild commands.`,
    );
  } catch (error) {
    console.error(
      'Error registering guild-specific application commands:',
      error,
    );
  }
};
