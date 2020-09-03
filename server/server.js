// Load environment
require("console-stamp")(console, "[HH:MM:ss.l]");
require("dotenv").config({ path: "../.env" });
const jsdom = require('jsdom');
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const getDecorator = require("./dekorator");
const buildPath = path.resolve(__dirname, "../build");
const server = express();
const { JSDOM } = jsdom;

const frontendloggerScript = () => {
    const scriptTag = `<div id="frontendlogger"><script type="application/javascript" src="${process.env.FRONTENDLOGGER_BASE_URL}/logger.js"></script></div>`;
    const { document } = new JSDOM(scriptTag).window;
    return document.getElementById('frontendlogger')['innerHTML'];
}

server.set("views", `${__dirname}/../build`);
server.set("view engine", "mustache");
server.set("X-Frame-Options", "SAMEORIGIN");
server.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
server.set("X-Content-Type-Options", "nosniff");
server.set("X-XSS-Protection", "1; mode=block");
server.engine("html", mustacheExpress());

// Parse application/json
server.use(express.json());

// Static files
server.use('/', express.static(buildPath, { index: false }));

// Nais functions
server.get(`/internal/isReady`, (req, res) =>
  res.sendStatus(200)
);

server.get(`/internal/isAlive`, (req, res) =>
    res.sendStatus(200)
);

server.get(`/config`, (req, res) =>
  res.send({
    appUrl: process.env.REACT_APP_URL,
    loginserviceUrl: process.env.REACT_APP_LOGINSERVICE_URL,
    apiUrl: process.env.REACT_API_URL,
  })
);

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
  getDecorator()
    .then((fragments) => {
      res.render("index.html", {...fragments, FRONTEND_LOGGER_SCRIPT: frontendloggerScript()});
    })
    .catch((e) => {
      const error = `Failed to get decorator: ${e}`;
      console.error(error);
      res.status(500).send(error);
    })
);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`App listening on: ${port}`));

process.on("SIGTERM", () =>
  setTimeout(() => console.log("Har sovet i 30 sekunder"), 30000)
);
