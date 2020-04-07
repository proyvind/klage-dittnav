// Load environment
require("console-stamp")(console, "[HH:MM:ss.l]");
require("dotenv").config({ path: "../.env" });
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const getDecorator = require("./dekorator");
const buildPath = path.resolve(__dirname, "../build");
const basePath = `/`;
const server = express();

server.set("views", `${__dirname}/../build`);
server.set("view engine", "mustache");
server.engine("html", mustacheExpress());

// Parse application/json
server.use(express.json());
server.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  res.setHeader(
    "Content-Security-Policy",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${[
      "appres.nav.no",
      "www.nav.no",
      "www-q1.nav.no",
      "https://klage.dev-nav.no",
      "https://klage.dev-gcp.nais.io",
      "account.psplugin.com",
      "in.taskanalytics.com",
      "static.hotjar.com",
      "script.hotjar.com",
      "vc.hotjar.io",
      "www.google-analytics.com",
      "www.googletagmanager.com"
    ].join(" ")}; connect-src 'self' api.amplitude.com amplitude.nav.no nav.psplugin.com tjenester.nav.no vc.hotjar.io;`
  );
  next();
});

// Static files
server.use(`${basePath}`, express.static(buildPath, { index: false }));

// Nais functions
server.get(`${basePath}/internal/isReady`, (req, res) =>
  res.sendStatus(200)
);

server.get(`${basePath}/internal/isAlive`, (req, res) =>
    res.sendStatus(200)
);

server.get(`${basePath}/config`, (req, res) =>
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
      res.render("index.html", fragments);
    })
    .catch((e) => {
      const error = `Failed to get decorator: ${e}`;
      console.error(error);
      res.status(500).send(error);
    })
);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`App listening on port: ${port}`));

process.on("SIGTERM", () =>
  setTimeout(() => console.log("Har sovet i 30 sekunder"), 30000)
);
