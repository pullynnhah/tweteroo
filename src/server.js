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
    return res.status(StatusCodes.NOT_FOUND).send("Usuário já existe!");

  usersDB.push({ username, avatar });
  res.status(StatusCodes.CREATED).send("OK");
});

server.post("/tweets", (req, res) => {
  const { username } = req.headers;
  const { tweet } = req.body;

  const user = usersDB.find(u => u.username === username);

  if (!user) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  if (!tweet) return res.status(StatusCodes.BAD_REQUEST).send("Todos os campos são obrigatórios!");

  tweetsDB.push({ username, tweet });
  console.log(tweetsDB);
  res.status(StatusCodes.CREATED).send("OK");
});

server.get("/tweets", (req, res) => {
  let { page = 1 } = req.query;
  page = Number(page);
  if (isNaN(page) || page !== 1 || page < 1 || page > Math.ceil(tweetsDB.length / 10))
    return res.status(StatusCodes.BAD_REQUEST).send("Informe uma página válida!");

  const start = -10 * page;
  const end = tweetsDB.length + start + 10;

  const tweets = tweetsDB
    .slice(start, end)
    .map(t => ({ ...t, avatar: usersDB.find(u => u.username).avatar }));

  tweets.reverse();
  res.send(tweets);
});

server.get("/tweets/:username", (req, res) => {
  const { username } = req.params;

  const avatar = usersDB.find(u => u.username === username)?.avatar;
  if (!avatar) return res.status(StatusCodes.NOT_FOUND).send("Usuário não encontrado!");

  const tweets = tweetsDB.filter(t => t.username === username).map(t => ({ ...t, avatar }));
  tweets.reverse();
  res.send(tweets);
});

server.listen(port, () => console.log(`🎉 Server listening on port ${port}...`));
