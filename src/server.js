import cors from "cors";
import express, { json } from "express";
import "dotenv/config";

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(json());

server.listen(port, () => console.log(`🎉 Server listening on port ${port}...`));
