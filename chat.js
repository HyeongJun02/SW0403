// 중요! 소스코드의 경로에 한글이 있으면 안 됨

// npm init -y
// => package.json 자동 설치

// npm install ws
// => package-lock.json 자동 설치

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }); // websocket wss 만듦

wss.on('connection', function connection(ws) { // server on
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    // 받은 메시지를 모든 클라이언트에게 보냄
    wss.clients.forEach(function each(client) { // for문을 돌면서 모든 클라이언트에게 보내줌
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send('Welcome to the chat server!');
});

console.log('Chat server is running on ws://localhost:8080');
