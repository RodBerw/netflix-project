import { DataTypes, Model } from "sequelize";
import { connection } from "../db/db";
import { movieDTO } from "../dtos/movieDTO";

export class Movie extends Model<movieDTO> implements movieDTO {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public director!: string;
  public genre!: string;
  public releaseDate!: Date;
  public imageUrl!: string;
  public type!: string;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "movies",
  }
);
