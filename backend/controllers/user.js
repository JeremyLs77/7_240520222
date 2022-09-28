// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../mysqlconfig");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const SECRET_KEY = process.env.JWT_KEY;

const regexEmail =
  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
const regexPassword = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;

// Fonction signup
exports.signup = (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.nom || !req.body.prenom) {
    return res.status(400).json({
      message: "Informations manquantes",
    });
  } else if (!regexEmail.test(req.body.email) || !regexPassword.test(req.body.password)) {
    return res.status(401).json({
      message: "Mauvaise requete",
    });
  }
  bcrypt.hash(req.body.password, 10).then((hash) => {
    let uti = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: hash,
    };
    console.log(req.body);
    db.query(`INSERT INTO uti SET ?`, uti, (err, result, field) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ error: err });
      }
      return res.status(201).json({ message: "Utilisateur créé" });
    });
  });
};

// Fonction login
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body.password);
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Informations manquantes",
    });
  } else if (!regexEmail.test(req.body.email) || !regexPassword.test(req.body.password)) {
    return res.status(401).json({
      message: "Mauvaise requete",
    });
  }
  if (email && password) {
    db.query("SELECT * FROM uti WHERE email= ?", email, (error, results, _fields) => {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password).then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "Utilisateur ou mot de passe inconnu" });
          } else {
            const expireIn = 24 * 60 * 60;
            const token = jwt.sign(
              {
                uti_id: results[0].uti_id,
                isadmin: results[0].isadmin,
              },
              SECRET_KEY,
              {
                expiresIn: expireIn,
              }
            );

            res.header("Authorization", "Bearer " + token);

            let status = "";
            if (results[0].isadmin === 1) {
              status = "admin";
            } else {
              status = "membre";
            }

            let uti_id = results[0].uti_id;
            let nom = results[0].nom;
            let prenom = results[0].prenom;
            let email = results[0].email;

            return res.status(200).json({
              status: status,
              uti_id: uti_id,
              nom: nom,
              prenom: prenom,
              email: email,
              token,
            });
          }
        });
      } else {
        return res.status(404).json("utilisateur non trouvé");
      }
    });
  }
};

//Fonction suppression
exports.deleteUser = (req, res, next) => {
  // Extraction du token du header authorization
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!!token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  // Décodage du token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json("token_not_valid");
    } else {
      req.decoded = decoded;

      // Vérification s'il s'agit du compte utilisateur
      //console.log(decoded.uti_id);
      console.log(req.params.id);
      if (req.decoded.uti_id != req.params.id) {
        return res.status(403).json({ message: "Seul le propriétaire du compte peut le supprimer" });
      } else {
        db.query("DELETE FROM uti WHERE uti_id= ?", req.params.id, (error, result, field) => {
          if (error) {
            console.log(error);
            return res.status(400).json(error);
          }
          console.log("Le compte utilisateur a bien été supprimé");
          return res.status(200).json({ message: "Votre compte utilisateur a bien été supprimé" });
        });
      }
    }
  });
};

//Fonction modification
exports.updateUser = (req, res, next) => {
  const lastname = req.body.nom;
  const firstname = req.body.prenom;
  const password = req.body.password;
  const email = req.body.email;
  const id = req.body.uti_id;
  console.log(req.body);
  db.query(
    `UPDATE uti SET nom='${lastname}', prenom='${firstname}', password='${password}', email= '${email}' WHERE uti_id=${id}`,
    (error, results, fields) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json({ message: "Vos informations ont bien été modifiées !" });
    }
  );
};
