import { DataTypes, Model } from "sequelize";
import { connection } from "../db/db";
import { userDTO } from "../dtos/userDTO";
import { Movie } from "./movie";

export class User extends Model<userDTO> implements userDTO {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "users",
  }
);

// Set up the relationship between User and Movie
User.hasMany(Movie, { foreignKey: "userId" });
Movie.belongsTo(User, { foreignKey: "userId" });
