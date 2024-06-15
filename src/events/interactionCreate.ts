import { Client, Interaction } from 'discord.js';

module.exports = async (client: Client, interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    console.log(`${interaction.user.tag} used ${command.name}`);
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
};
