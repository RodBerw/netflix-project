import dotenv from "dotenv";
const Sequelize = require("sequelize");

dotenv.config();

const connection = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 3306,
});

connection
  .authenticate({
    logging: false,
  })
  .then(() => {
    console.log("Connection has been established successfully.");
    connection.sync();
  });

export { connection };
