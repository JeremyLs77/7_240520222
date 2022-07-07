const db = require("../mysqlconfig");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// Afficher les posts
exports.getallMessages = (req, res, next) => {
  db.query('SELECT * FROM post', (error, result) => {
      if (error) {
          return res.status(400).json({ error: "Erreur lors de l'affichage des posts" });
      }
      return res.status(200).json(result);
  });
};

// Création d'un post //
exports.createMessage = (req, res, next) => {
  const post = [[req.body.titre, req.body.texte, req.body.topic_id, req.body.id_1]];
  console.log(req.body);
  var sql = "INSERT INTO post (titre, texte, topic_id, id_1) VALUES ?"
  db.query(sql, [post], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(400).json("erreur");
    } 
      console.log("toto");
      return res.status(201).json({ message: "Votre post a bien été crée" });
    }
    )};
    
// Suppression d'un post
exports.deleteMessage = (req, res, next) => {
  db.query('DELETE FROM post WHERE post_id= ?', req.body.post_id, (error, result, field) => {
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