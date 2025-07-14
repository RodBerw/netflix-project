import { Model } from "sequelize-typescript";
export declare class Movie extends Model {
    movie_id: number;
    user_id: number;
    title: string;
    genre: string;
    director: string;
    year: number;
    description: string;
}
