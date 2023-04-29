import cors from "cors";
import express, { json } from "express";
import "dotenv/config";

const server = express();
const port = process.env.PORT || 5000;
const usersDB = [];
const tweetsDB = [];

server.use(cors());
server.use(json());

server.post("/sign-up", (req, res) => {
  res.send("POST /sign-up");
});

server.post("/tweets", (req, res) => {
  res.send("POST /tweets");
});

server.get("/tweets", (req, res) => {
  res.send("GET /tweets");
});

server.get("/tweets/:username", (req, res) => {
  res.send("GET /tweets/:username");
});

server.listen(port, () => console.log(`🎉 Server listening on port ${port}...`));
