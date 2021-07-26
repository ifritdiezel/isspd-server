const { readDefaults, log } = require("../util");
const { readRegistered } = require("../util");
const { version } = require("../../package");
const { Webhook } = require('discord-webhook-node');
const { webhooktoken, dailyseed } = require("../../config");
const seedrandom = require('seedrandom');

const handleAuth = (sockets, socket, token) =>
  new Promise((res, rej) => {
    readRegistered().then(keys => {
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

function motd (nick, seed) {
  var motd = {"motd":`Hello ${nick}! Welcome to IS SPDNet server! \nBuild: ${version}`}
  if(dailyseed){
    let today = new Date().toISOString().slice(0, 10);
    console.log(today);
    seedrandom(today, { global: true });
    var randomnum = Math.random()*100000000;
    console.log(randomnum);
    var todayseed = Math.floor(randomnum);
    motd.seed = todayseed
  } else {
    var todayseed = seed;
    motd.seed = todayseed
  }
  console.log(todayseed);
  return JSON.stringify(motd)
};


module.exports = {
  handleAuth,
  motd
};
