require('dotenv').config();
const ws = require('ws');
const translate = require('translate');

translate.engine = 'yandex';
translate.key = process.env.YANDEX_KEY;

const server = new ws.Server({port: 9999});

server.on('connection', (socket) => {
  console.log("Got a new connection");

  socket.send("Welcome to the server.");

  /*
  const interval = setInterval(() => {
    if (socket.readyState === ws.OPEN) {
      socket.send("Ping");
    }
  }, 3000);
  */

  socket.on('message', (message) => {
    console.log("Got a new message:", message);
    server.clients.forEach(async (client) => {
      if (client.readyState === ws.OPEN) {
        const msg = await translate(message, 'es');
        client.send(msg);
      }
    });
  });

  socket.on('close', () => {
    console.log("Lost a connection");
    //clearInterval(interval);
  });
});
