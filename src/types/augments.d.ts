import { Client, CollectedInteraction, Collection, InteractionCollector } from 'discord.js'
import { Lavalink } from '../music/lavalink.js'
import { WebSocketConnector } from '../utilities/websocket.js'
import { CustomFilters } from '../music/customFilters.js'
import { CommandStructure } from './types.js'
import { levels } from '../utilities/logging.js'
import { SearchResult, Track } from 'lavalink-client/dist'
import { Requester } from './types'

declare global {
  namespace NodeJS {
    // noinspection JSUnusedGlobalSymbols
    interface ProcessEnv {
      [key: string]: string | undefined,
      DISCORD_TOKEN: string,
      DISCORD_APP_ID: string,
      GENIUS_CLIENT_TOKEN: string,
      YOUTUBE_PAPISID: string,
      YOUTUBE_PSID: string,
      LOGGING_LEVEL: keyof typeof levels
    }
  }
}

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, CommandStructure>,
    lavalink: Lavalink,
    websocket: WebSocketConnector
  }
}

declare module 'lavalink-client' {
  // noinspection JSUnusedGlobalSymbols
  interface Player {
    filters: CustomFilters,
    extendedSearch: (query: string, requester: Requester) => Promise<SearchResult>,
    executeAutoplay: (client: Client, lastTrack: Track) => Promise<void>,
    plugins: {
      extendedSearch: boolean,
      customFilters: boolean
    },
    collectors: InteractionCollector<CollectedInteraction>[]
  }
}
