const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
  // Se acessar a raiz, serve o arquivo do jogo
  let filePath = req.url === '/' ? './royale_mobile_audio.html' : '.' + req.url;
  let extname = String(path.extname(filePath)).toLowerCase();
  let contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Arquivo não encontrado: ' + req.url);
      } else {
        res.writeHead(500);
        res.end('Erro interno no servidor: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(` Servidor rodando! Acesse no celular pelo IP do seu notebook na porta ${PORT}`);
});