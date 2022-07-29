// Imports
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const SECRET_KEY = process.env.JWT_KEY;


module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!!token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    }
    if (token) {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
          if (err) {
              return res.status(401).json('token_not_valid');
          } else {
              req.decoded = decoded;

              const expiresIn = 24 * 60 * 60;
              const newToken  = jwt.sign({
                  uti_id : decoded.id,
                  status : decoded.status,
                  role: decoded.role
              },
              SECRET_KEY,
              {
                  expiresIn: expiresIn
              });
              console.log(decoded.role);
              console.log(decoded.uti_id);
              res.header('Authorization', 'Bearer ' + newToken);

              next();
          
          }
      });
  } else {
      return res.status(401).json('token_required');
  }
}