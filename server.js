global.__base = __dirname;

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const getFunFactModule = require('./server/getFunFactModule');

app.get('/api/getFunFact/', (req, res) => {

  getFunFactModule.getFunFact()
  .then((response) => {
    res.send(response);
  })
  .catch((err) => {
    console.log(err);
  });
});

const server = app.listen(port, () => {
  console.log(`listening on port ${ port }`);
});

module.exports = server;
