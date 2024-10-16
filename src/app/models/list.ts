import { Model } from "sequelize";
import { listDTO } from "../dtos/listDTO";

export class List extends Model<listDTO> implements listDTO {
  public id!: number;
  public userId!: number;
  public moviesId!: number[];
}
