const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const rateLimit = require("express-rate-limit");

// Parametrage des headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// Gestion des cookies
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Paramétrage de rateLimit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limite de 100 requetes pour la durée window spécifiée
});

app.use(limiter);

// Sécurisation des headers HTTP
app.use(helmet());

// Exports
module.exports = app;