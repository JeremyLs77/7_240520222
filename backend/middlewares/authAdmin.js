const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const SECRET_KEY = process.env.JWT_KEY;

module.exports = (req, res, next) => {
    // Extraction du token du header authorization
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        }
    // Décodage du token                   
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json('token_not_valid');
        } else {
            req.decoded = decoded;
    // Vérification s'il s'agit d'un compte administrateur
        console.log(decoded.isadmin);
        if (req.decoded.isadmin != '1'){
            return res.status(403).json({ message: 'Cette fonctionalité est reservée à l\'administrateur'});
        } else {
            next();
        }
        }
    })
};