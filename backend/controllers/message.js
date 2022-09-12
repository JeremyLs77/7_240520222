const db = require("../mysqlconfig");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const base64ImageToFile = require('base64image-to-file');


// Afficher les posts
exports.getallMessages = (req, res, next) => {
  db.query('SELECT * FROM post', (error, results) => {
      if (error) {
          return res.status(400).json({ error: "Erreur lors de l'affichage des posts" });
      }
      let posts = results;
      return res.status(200).json({
        posts
      })
  });
};

// Création d'un post //
exports.createMessage = (req, res, next) => {
  const base64Image = req.body.image;
  const date = new Date();
  const currentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
  const auteur = req.body.auteur;
  const fileName = auteur + "-" + currentDate;
  base64ImageToFile(base64Image, 'tmp/', fileName, function(err) {
    if(err) {
      return console.error(err);
    }
  const post = ({
    texte: req.body.texte,
    titre: req.body.titre,
    date_creation: currentDate,
    id_1: req.body.id_1,
    auteur: req.body.auteur,
    image: fileName + '.gif',
  })
  console.log(req.body);
  let sql = "INSERT INTO post SET ?";
  db.query(sql, [post], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(400).json("erreur");
    } 
      return res.status(201).json({ message: "Votre post a bien été crée" });
    })
  });
  },
    
// Suppression d'un post
exports.deleteMessage = (req, res, next) => {
  db.query('DELETE FROM post WHERE post_id= ?', req.params.id, (error, result, field) => {
  
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    console.log("Le post a bien été supprimé");
    return res.status(200).json({ message: "Votre post a bien été supprimé" });
  });
};

// Editer un post
exports.editMessage = (req, res, next) => {
  const texte = req.body.texte;
  const id = req.body.post_id;
  console.log(req.body);
    db.query(`UPDATE post SET texte='${texte}' WHERE post_id=${id}`, (error, results, fields) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json({ message: "Votre post a bien été modifié" });
    });
  };