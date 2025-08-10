const cors = require("cors");

const corsmiddleware = cors({
  origin: [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    // "https://www.cardsproject.co.il",
    "https://vonclick.onrender.com/"
  ], methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', `x-auth-token`],
  credentials: true,
});

module.exports = corsmiddleware;
