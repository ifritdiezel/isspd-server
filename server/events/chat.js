const { log } = require("../util");
const events = require("./events");
const send = require("../send");
const { Webhook } = require('discord-webhook-node');
const { webhooktoken } = require("../../config")

const handleChat = (sockets, socket, data) => {
let player = sockets.get(socket.id);
      let json = JSON.parse(data);
      json.nick = player.nick;
      let payload = JSON.stringify(json);
      socket.broadcast.emit(events.CHAT, send.CHAT, payload);
      if (webhooktoken) {
        const hook = new Webhook(webhooktoken);
        hook.disableMentions;
        hook.setUsername(json.nick);
        hook.send(json.data);
      }
};

module.exports = { handleChat };
