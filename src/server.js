import cors from "cors";
import express, { json } from "express";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";

const server = express();
const port = process.env.PORT || 5000;
const usersDB = [];
const tweetsDB = [];

server.use(cors());
server.use(json());

server.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!(username && avatar))
    return res.status(StatusCodes.BAD_REQUEST).send("Todos os campos são obrigatórios!");

  if (usersDB.find(u => u.username === username))
    return res.status(StatusCodes.CONFLICT).send("Usuário já existe!");

  usersDB.push({ username, avatar });
  res.status(StatusCodes.CREATED).send("OK");
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
