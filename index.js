const express = require("express");
const helmet = require("helmet");
const knex = require('knex');
const db = knex("./knexfile.js");

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/", (req, res) => {
  db("lambda")
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
