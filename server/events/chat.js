const { log } = require("../util");
const events = require("./events");
const send = require("../send");
const { Webhook } = require('discord-webhook-node');
const { webhooktoken } = require("../../config")
const hook = new Webhook(webhooktoken);

const handleChat = (sockets, socket, data) => {
let player = sockets.get(socket.id);
      let json = JSON.parse(data);
      json.nick = player.nick;
      let payload = JSON.stringify(json);
      socket.broadcast.emit(events.CHAT, send.CHAT, payload);
      log (payload);
      if (webhooktoken) {
        hook.setMentions(1);
        hook.setUsername(json.nick);
        hook.send(json.data);
      }
};

module.exports = { handleChat };
