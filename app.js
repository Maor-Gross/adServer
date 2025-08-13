const express = require("express");
const chalk = require("chalk");
const path = require("path");
const connectToDB = require("./DB/dbService");
const router = require("./router/router");
const corsmiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const loggerMiddleware = require("./logger/loggerService");

const app = express();
const PORT = process.env.PORT || 8182;

// Middlewares
app.use(express.json());
app.use(loggerMiddleware());
app.use(corsmiddleware);

// API routes
app.use("/api", router);

// Serve static files from "public" (if any)
app.use(express.static(path.join(__dirname, "public")));

// Serve React build (Vite output is "dist")
// הנתיב לתיקיית הלקוח תוקן
const clientBuildPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientBuildPath));

// Catch-all: כל נתיב שלא נמצא מפנה ל-index.html של הלקוח
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Error handler for APIs
app.use((err, req, res, next) => {
  console.error(err);
  return handleError(res, 500, "Internal Server Error");
});

// Start server
app.listen(PORT, () => {
  console.log(chalk.green.bold.bgYellow(`App is listening on port ${PORT}`));
  connectToDB();
});