const http = require('http');

const hostname = '0.0.0.0';
const port = 8080;

console.log(process.env.ENVIRONMENT || 'End-to-End Testing Environment');

console.log(process.env.ENVIRONMENT || 'Production Environment');

/*if (process.env.ENVIRONMENT === 'prod') {	
    process.exit(1);	
}*/

const server = http.createServer((_, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Ceci est une démo!\n');
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
