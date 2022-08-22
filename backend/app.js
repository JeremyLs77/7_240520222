const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const rateLimit = require("express-rate-limit");
const userRoute = require("./routes/user");
const messageRoute = require("./routes/message");
const dotenv = require("dotenv");
require('dotenv').config();
dotenv.config({path: './.env'});

// Parametrage des headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "process.env.FRONTEND_URL");
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit : "50mb"}))

app.use(express.json());

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

//Routes
app.use('/user', userRoute);
app.use('/message', messageRoute);

// Sécurisation des headers HTTP
app.use(helmet());

// Exports
module.exports = app;