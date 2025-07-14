import { Movie } from './models/Movie';
import { User } from './models/User';
export declare class AppService {
    private movie;
    private user;
    constructor(movie: typeof Movie, user: typeof User);
    getUsers(id: number): Promise<any>;
    createUser(body: any): Promise<any>;
    updateUser(body: any, id: number): Promise<any>;
    getMovies(id: number): Promise<any>;
    createMovie(body: any): Promise<any>;
    updateMovie(body: any, id: number): Promise<any>;
}
