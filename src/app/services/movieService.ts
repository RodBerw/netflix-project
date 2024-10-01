import { movieDTO } from "../dtos/movieDTO";
import { Movie } from "../models/movie";

class MovieService {
  public async createMovie(movie: movieDTO) {
    return await Movie.create({ ...movie });
  }

  public async getMovies() {
    return await Movie.findAll();
  }

  public async getMovieById(id: number) {
    return await Movie.findByPk(id);
  }

  public async updateMovie(id: number, movie: movieDTO) {
    return await Movie.update(movie, { where: { id } });
  }

  public async deleteMovie(id: number) {
    return await Movie.destroy({ where: { id } });
  }
}

export default new MovieService();
