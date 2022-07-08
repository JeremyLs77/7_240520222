// Imports
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const SECRET_KEY = process.env.JWT_KEY;

//module.exports = (req, res, next) => {
  //try {
    //const token = req.headers.authorization.split(" ")[1];
    //const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    //const uti_id = decodedToken.uti_id;
    //req.auth = { uti_id };
    //if (req.body.uti_id && req.body.uti_id !== uti_id) {
      //throw "Invalid user ID";
    //} else {
      //next();
    //}
  //} catch {
    //res.status(401).json({
      //error: new Error("Invalid request!"),
    //});
  //}
//};

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
                  user : decoded.user
              },
              SECRET_KEY,
              {
                  expiresIn: expiresIn
              });

              res.header('Authorization', 'Bearer ' + newToken);
              next();
          }
      });
  } else {
      return res.status(401).json('token_required');
  }
}