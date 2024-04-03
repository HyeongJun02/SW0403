const { createServer } = require('http'); // 중괄호 사용: http 모듈 안에 있는 createServer 함수를 가져옴. 그냥 쓸게.

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200; // 정상 (404: Not Found)
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => { // 서버가 실행되는 동안 이벤트 감시(listen)
  console.log(`Server running at http://${hostname}:${port}/`);
});
