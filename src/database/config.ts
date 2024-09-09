require('dotenv/config');

module.exports = {
  development: {
    dialect: process.env.DB_TYPE_HSH,
    host: process.env.DB_HOST_HSH,
    port: process.env.DB_PORT_HSH,
    username: process.env.DB_USERNAME_HSH,
    password: process.env.DB_PASSWORD_HSH,
    database: process.env.DB_DATABASE_HSH,
  },
};
