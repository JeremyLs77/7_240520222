// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../mysqlconfig");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const SECRET_KEY = process.env.JWT_KEY;

// Fonction signup
exports.signup = (req, res, next) => {
  const uti = [[req.body.nom, req.body.prenom, req.body.email, req.body.password]];
  console.log(req.body);
  let sql = "INSERT INTO uti (nom, prenom, email, password) VALUES ?";
  db.query(sql, [uti], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
    console.log("toto");
    res.status(201).json({ message: "Utilisateur créé" });
  });
};

// Fonction login
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body.password);
  if (email && password) {
    db.query("SELECT * FROM uti WHERE email= ?", email, (error, results, _fields) => {
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

      return res.status(200).json({
        status: status,
      });
    });
  } else {
    return res.status(404).json("user_not_found");
  }
};

// Fonction login
//exports.login = (req, res, next) => {
//const email = req.body.email;
//const password = req.body.password;
//console.log(req.body.password);
//if (email && password) {
//db.query("SELECT * FROM uti WHERE email= ?", email, (error, results, _fields) => {
//console.log(req.body.password);
//if (results.length > 0) {
//console.log(results[0].password===password)
//bcrypt.compare(password, results[0].password).then((valid) => {
//if (!results[0].password===password) {
//res.status(401).json({ message: "Utilisateur ou mot de passe inconnu" });
//} else {
//console.log(results[0].uti_id+"s'est connecté");
//res.status(200).json({
//uti_id: results[0].id,
//email: results[0].email,
//isAdmin: results[0].isAdmin,
//token: jwt.sign(
//{ uti_id: results[0].id,
//isAdmin: results[0].isAdmin },
//'RANDOM_TOKEN_SECRET',
//{ expiresIn: '24h' }),
//});
//}
//});
//} else {
//res.status(401).json({ message: "Utilisateur ou mot de passe inconnu" });
//}
//});
//} else {
//res.status(500).json({ message: "Entrez vos identifiants" });
//};
//}

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
      console.log(decoded.uti_id);
      if (req.decoded.uti_id != req.body.uti_id) {
        return res.status(403).json({ message: "Seul le propriétaire du compte peut le supprimer" });
      } else {
        db.query("DELETE FROM uti WHERE uti_id= ?", req.body.uti_id, (error, result, field) => {
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
  //let passwords = req.body.password;
  //bcrypt.hash(passwords, 10).then((hash) => {
  //passwords = hash;
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
