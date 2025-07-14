import { DataTypes, Model } from "sequelize";
import { listDTO } from "../dtos/listDTO";
import { connection } from "../db/db";

export class List extends Model<listDTO> implements listDTO {
  public id!: number;
  public userId!: number;
  public moviesId!: string;
}

List.init(
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
    moviesId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    tableName: "lists",
  }
);
