require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.config.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
