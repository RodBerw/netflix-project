import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getUsers(id: number): Promise<any>;
    createAndUpdateUser(body: any, id: number): Promise<any>;
    getMovies(id: number): Promise<any>;
    createAndUpdateMovie(body: any, id: number): Promise<any>;
}
