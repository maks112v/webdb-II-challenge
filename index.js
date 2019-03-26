const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};
const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/", (req, res) => {
  db("zoos")
    .then(zoo => {
      console.log(zoo);
      res.status(200).json(zoo);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.get("/:id", (req, res) => {
  const zooid = req.params.id;
  db("zoos")
    .where({ id: zooid })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/", (req, res) => {
  db("zoos")
    .insert(req.body)
    .then(arr => {
      res.status(201).json(arr);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.put("/:id", (req, res) => {
  const zooid = req.params.id;
  db("zoos")
    .where({ id: zooid })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/:id", (req, res) => {
  const zooid = req.params.id;
  db("zoos")
    .where({ id: zooid })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
