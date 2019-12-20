import express from "express";
import compression from 'compression';
import dotenv from "dotenv";
import Router from "Router";
import bodyParser from "body-parser";
import { configureCors } from "conf/cors";

dotenv.config();

const PORT = process.env.PORT || 8083;
const Server = express();

// Compress all responses
Server.use(compression());
// Parse request bodies using JSON.
Server.use(bodyParser.json());

Server.all("*", configureCors(), (request, response) => {
  new Router({ request, response }).routeRequest();
});

Server.listen(PORT, error =>
  error
    ? console.error(error)
    : console.info(
        `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT} in your browser.`
      )
);
