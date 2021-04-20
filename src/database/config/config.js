require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres",
    password: process.env.DATABASE_PASSWORD,
  },

  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "pg",
    password: process.env.DATABASE_PASSWORD,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};

