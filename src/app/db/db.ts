import dotenv from "dotenv";
const Sequelize = require("sequelize");

dotenv.config();

// Sqlite3
const connection = new Sequelize({
  dialect: "sqlite",
  storage: "./netflix_db.sqlite",
  logging: false,
});

// const connection = new Sequelize({
//   dialect: "mysql",
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: "localhost",
//   port: 3306,
// });

connection
  .authenticate({
    logging: false,
  })
  .then(() => {
    console.log("Connection has been established successfully.");
    connection.sync({ force: false });
  });

export { connection };
