const dotenv = require("dotenv");
require('dotenv').config();
dotenv.config({path: './.env'});
const URL = process.env.URL;

module.exports = {
  devServer: {
    proxy: URL
  }
}
