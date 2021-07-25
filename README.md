# IS-SPDNet server
Features:
- Chat support
- Compatibility with normal clients
- Discord bridge (currently 1-way only)

## Config

`defaults.json` values:
1. `port`: The port the server will run on
2. `roomprefix`: The prefix the server will use on all depth rooms
3. `seed`: The seed that will be sent to all players
4. `itemSharing`: Whether to allow players to share items by throwing
5. `webhooktoken`: The webhook token used to bridge with Discord. Leave null to disable

`keys.json` contains token:nickname pairs used for identification

## Requirements

`discord-webhook-node`

## Running

`npm run start`
