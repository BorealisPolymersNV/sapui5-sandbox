#!/usr/bin/env node

var fs = require('fs');
var url=require('url');
var path = require('path');
var http = require('http');
var querystring = require('querystring');

http.createServer(function(request, response) {

  var parsedUrl = url.parse(request.url);
  console.log('request starting...', parsedUrl.pathname);

  var filePath = '.' + parsedUrl.pathname; //request.url;
  if (filePath == './')
    filePath = './index.html';

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
  }

  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./404.html', function(error, content) {
          response.writeHead(200, {
            'Content-Type': contentType
          });
          response.end(content, 'utf-8');
        });
      } else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        response.end();
      }
    } else {
      response.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      });
      response.end(content, 'utf-8');
    }
  });

}).listen(8125);

console.log('Server running at http://127.0.0.1:8125/');
