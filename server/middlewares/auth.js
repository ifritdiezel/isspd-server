const { readDefaults, log } = require("../util");
const { readRegistered } = require("../util");
const { version } = require("../../package");
const { Webhook } = require('discord-webhook-node');
const { webhooktoken } = require("../../config")

const handleAuth = (sockets, socket, token) =>
  new Promise((res, rej) => {
    readRegistered().then(keys => {

log(JSON.stringify(keys));
if (keys[token] != null){
  var something = {
          nick:`${keys[token]}`
        };
        sockets.set(socket.id, { socket, ...something });
        log(socket.id, "identified as:", keys[token]);
        if (webhooktoken) {
        const hook = new Webhook(webhooktoken);
        hook.disableMentions(0);
        hook.setAvatar("https://media.discordapp.net/attachments/837549718242328586/867368178324733962/join.png");
        hook.send(keys[token] + " joined the game")
      }
        res();
      } else {
        log(token, socket.id, "rejected auth");
        const e = new Error("Your key is invalid!");
        rej(e);
      }
    })
  });

const motd = (nick, seed) => ({
  motd: `Hello ${nick}! Welcome to IS SPDNet server! \nBuild: ${version}`,
  seed,
});

module.exports = {
  handleAuth,
  motd
};
