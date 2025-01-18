require("dotenv").config();

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  server: process.env.SERVER,
  domain: process.env.DOMAIN,
  database: {
    uri: process.env.DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiredIn: process.env.JWT_EXPIRED_IN,
  },
};
