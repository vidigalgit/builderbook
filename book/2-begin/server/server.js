/* eslint-disable prettier/prettier */
const express = require('express');
const next = require ('next');

const mongoose = require ('mongoose');

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = process.env.MONGO_URL_TEST;

mongoose.connect(MONGO_URL);

const port = process.env.PORT || 8000;
const ROOT_URL=`http://localhost:${port}`;

const app = next({dev});
const handle = app.getRequestHandler();

// Next.js server prepared
app.prepare().then(() => {
    const server = express();
  
   server.get('/', (req, res) => {
      const user = JSON.stringify({email:'vidigal@gmail.com'});
      app.render(req,res, '/',{user});
   });
  
    server.get('*', (req, res) => handle(req, res));
  
    // starting express server
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${ROOT_URL}`); 
    });
  });