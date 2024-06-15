import { Client as DiscordClient, Collection } from 'discord.js';

declare module 'discord.js' {
  export interface Client extends DiscordClient {
    commands: Collection<string, any>;
  }
}
