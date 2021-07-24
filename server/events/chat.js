const { log } = require("../util");
const events = require("./events");
const send = require("../send");
const { Webhook } = require('discord-webhook-node');
const defaults = require("../../defaults")
const hook = new Webhook(defaults.WEBHOOKTOKEN);

const handleChat = (sockets, socket, data) => {
let player = sockets.get(socket.id);
      let json = JSON.parse(data);
      log (player.nick, json.data);
      json.nick = player.nick;
      let payload = JSON.stringify(json);
      socket.broadcast.emit(events.CHAT, send.CHAT, payload);
      log (payload);
      hook.setMentions(1);
      hook.setUsername(json.nick);
      hook.send(json.data);

};

module.exports = { handleChat };
