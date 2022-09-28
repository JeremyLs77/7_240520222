const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_KEY;
const db = require("../mysqlconfig");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const base64ImageToFile = require("base64image-to-file");

const regexTitre = /(.*[a-z]){4}/i;
const regexTexte = /(.*[a-z]){4}/i;

// Afficher les posts
exports.getallMessages = (req, res, next) => {
  db.query("SELECT * FROM post", (error, results) => {
    if (error) {
      return res.status(400).json({ error: "Erreur lors de l'affichage des posts" });
    }
    let posts = results;
    return res.status(200).json({
      posts,
    });
  });
};

// Création d'un post //
exports.createMessage = (req, res, next) => {
  const base64Image = req.body.image;
  const date = new Date();
  const currentDate =
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
  const auteur = req.body.auteur;
  const fileName = auteur + "-" + currentDate;
  if (!req.body.texte || !req.body.titre || !req.body.image) {
    return res.status(400).json({
      message: "Informations manquantes",
    });
  } else if (!regexTitre.test(req.body.titre) || !regexTexte.test(req.body.texte)) {
    return res.status(401).json({
      message: "Mauvaise requete",
    });
  }
  base64ImageToFile(base64Image, "tmp/", fileName, function (err) {
    if (err) {
      return console.error(err);
    }
    const post = {
      texte: req.body.texte,
      titre: req.body.titre,
      date_creation: currentDate,
      id_1: req.body.id_1,
      auteur: req.body.auteur,
      image: fileName + ".gif",
    };
    console.log(req.body);
    let sql = "INSERT INTO post SET ?";
    db.query(sql, [post], function (err, result) {
      if (err) {
        console.log(err);
        return res.status(400).json("erreur");
      }
      return res.status(201).json({ message: "Votre post a bien été crée" });
    });
  });
};

// Modération d'un post
exports.deleteMessage = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!!token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json("token_not_valid");
    } else {
      req.decoded = decoded;
    }
    if (req.decoded.isadmin != "1") {
      return res.status(403).json({ message: "Cette fonctionalité est reservée à l'administrateur" });
    } else {
      db.query("DELETE FROM post WHERE post_id= ?", req.params.id, (error, result, field) => {
        if (error) {
          console.log(error);
          return res.status(400).json(error);
        }
        console.log("Le post a bien été supprimé");
        return res.status(200).json({ message: "Votre post a bien été supprimé" });
      });
    }
  });
};

// Editer un post
exports.editMessage = (req, res, next) => {
  const texte = req.body.texte;
  const id = req.body.post_id;
  if (!req.body.texte || !req.body.id) {
    return res.status(401).json({
      message: "Informations manquantes",
    });
  }
  console.log(req.body);
  db.query(`UPDATE post SET texte='${texte}' WHERE post_id=${id}`, (error, results, fields) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ message: "Votre post a bien été modifié" });
  });
};
