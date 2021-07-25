const {log} = require("../util");
const events = require("./events");
const send = require("../send");
const { Webhook } = require('discord-webhook-node');
const { webhooktoken } = require("../../config")
const handleDisconnect = (sockets, socket ) => {
  log(socket.id, "disconnected");
  const s = sockets.get(socket.id);
  if (webhooktoken) {
    const hook = new Webhook(webhooktoken);
    hook.disableMentions(0);
    hook.setAvatar("https://media.discordapp.net/attachments/837549718242328586/867368177045602304/leave.png");
    hook.send(s.nick + " disconnected")
  }
  for (const room of socket.rooms) {
    if (room !== socket.id) {
      let payload = JSON.stringify({
        id: socket.id,
        playerClass: s.playerClass,
        nick: s.nick,
        depth: s.depth,
        pos: s.pos,
      });
      socket.to(room).emit(events.ACTION, send.LEAVE, payload);
    }
  }
  sockets.delete(socket.id);
}

module.exports = {
  handleDisconnect
}
