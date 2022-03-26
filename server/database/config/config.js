const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  development: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    dialect: "mysql",
  },
  test: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    port: process.env.RDS_PORT,
    host: process.env.RDS_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    port: process.env.RDS_PORT,
    host: process.env.RDS_HOST,
    dialect: "mysql",
  },
};

module.exports = config;
