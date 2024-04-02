/* eslint-disable prettier/prettier */
const express = require('express');
const next = require ('next');

const port = process.env.PORT || 8000;
const ROOT_URL=`http://localhost:${port}`;

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
  
   server.get('/', (req, res) => {
      const user = JSON.stringify({email:'vidigal@gmail.com'});
      app.render(req,res, '/',{user});
   });
  
    server.get('*', (req, res) => handle(req, res));
  
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
    });
  });