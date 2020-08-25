require("dotenv").config();
const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const ConnectMongoDb = require("./config/mongoose");
const PassportGoogle = require("./config/passportGoogle");

const PassportRoute = require("./router/passport");
const PortfolioRoute = require("./router/portfolio");
const UserRoute = require("./router/users");

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  await ConnectMongoDb();
  PassportGoogle();

  app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    server.use(cookieParser());

    server.use(PassportRoute);

    server.use("/api/user", UserRoute);
    server.use("/api/portfolio", PortfolioRoute);

    server.get("/api/test", (req, res) => {
      res.send("Testss");
    });

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
})();
