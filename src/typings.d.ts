import { Client as DiscordClient, Collection } from 'discord.js';

/*
 This file is used to declare your own types in addition to the ones provided by Discord.js.
 This means you get the benefits of type safety project-wide.
*/
declare module 'discord.js' {
  export interface Client extends DiscordClient {
    commands: Collection<string, any>;
    // Add your own types here...
  }
}
