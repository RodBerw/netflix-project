import { Model } from "sequelize-typescript";
export declare class User extends Model {
    user_id: number;
    name: string;
    email: string;
    password: string;
}
