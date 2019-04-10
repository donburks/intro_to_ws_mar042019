document.addEventListener("DOMContentLoaded", () => {
  console.log("Doc Ready");

  const socket = new WebSocket("ws://192.168.88.149:9999");

  socket.onmessage = (msg) => {
    const { data } = msg; 

    const p = document.createElement('p');
    p.innerText = data;
    document.querySelector("main").appendChild(p);
  };

  const chat = document.querySelector("#chat");

  chat.addEventListener("keyup", (evt) => {
    console.log("Ping");
    if (evt.keyCode === 13) {
      const msg = evt.target.value;
      socket.send(msg);
      evt.target.value = '';
    } 
  });
});
