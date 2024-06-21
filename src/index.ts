import '../env';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection<string, any>();

// Load Commands
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(
  (file: string) => file.endsWith('.ts') || file.endsWith('.js'),
);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Load Events
const eventFiles = readdirSync(join(__dirname, 'events')).filter(
  (file: string) => file.endsWith('.ts') || file.endsWith('.js'),
);

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  const eventName = file.split('.')[0];
  if (eventName === 'ready') {
    client.once(eventName, (...args) => event(client, ...args));
  } else {
    client.on(eventName, (...args) => event(client, ...args));
  }
}

console.log('Running...');
client.login(process.env.TOKEN);
