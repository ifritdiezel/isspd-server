# IS-SPDNet server
Features:
- Chat support
- Compatibility with normal clients
- Compatibility with the discord registration scheme via spdnetbot
- Discord bridge (currently 1-way only)
- Daily seed randomization

## Config

`defaults.json` values:
1. `port`: The port the server will run on
2. `roomprefix`: The prefix the server will use on all depth rooms
3. `seed`: The seed that will be sent to all players
4. `itemSharing`: Whether to allow players to share items by throwing
5. `webhooktoken`: The webhook token used to bridge with Discord. Leave null to disable
6. `dailyseed`: Randomize the seed every day

`keys.json` contains token:nickname pairs used for identification

## Requirements

`discord-webhook-node` **patched** to disable everyone/here pings.
Add the following code in webhook.js.
```
disableMentions(a){
        this.payload.allowed_mentions = {
    "parse": []
  }
        return this;
    }
```

## Running

Download source code. Unpack and run `npm run start` in the resulting directory.
