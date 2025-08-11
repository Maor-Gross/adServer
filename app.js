const express = require("express");
const chalk = require("chalk");
const connectToDB = require("./DB/dbService");
const router = require("./router/router");
const path = require('path');
const corsmiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const loggerMiddleware = require("./logger/loggerService");

const app = express();
const PORT = 8181;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(loggerMiddleware());


if (!isProduction) {
  app.use(corsmiddleware);
}

app.use("/api", router);

if (isProduction) {

  app.use(express.static(path.join(__dirname, 'build')));


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {

  app.use(express.static(path.join(__dirname, 'public')));
}

app.use((err, req, res, next) => {
  console.log(err);
  return handleError(res, 500, "Internal Server Error");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(chalk.green.bold.bgYellow(`app is listening on port ${PORT}`));
  connectToDB();
});
