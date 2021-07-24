const events = require("./events");

const handlePlayerListRequest = (sockets, socket) => {
  const list = [];
  sockets.forEach((p, i) => {
    const get = (i, o) => {
      let { [i]: n } = o;
      if (n === 0) return n;
      return n || null;
    };
    list.push({
      nick: get("nick", p),
      playerClass: get("playerClass", p),
      depth: get("depth", p),
      items: p.items,
    });
  });
  let payload = JSON.stringify({ list });
  socket.emit(events.PLAYERLISTREQUEST, payload);
};

module.exports = {
  handlePlayerListRequest,
};
