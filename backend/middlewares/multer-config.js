// Imports
const multer = require("multer");

//Définition du format des fichiers
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif" : "gif",
};

// Définition des fichiers entrants sur le disque
const storage = multer.diskStorage({
  //Localisation des fichiers a enregistrer
  destination: (req, file, callback) => {
    //Nom du dossier
    callback(null, "images");
  },
  //Paramètre pour nommer les fichiers
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Exports
module.exports = multer({ storage: storage }).single("image");