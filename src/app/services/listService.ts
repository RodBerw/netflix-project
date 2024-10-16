import { listDTO } from "../dtos/listDTO";
import { List } from "../models/list";

class ListService {
  async getListFromUserId(userId: number) {
    return await List.findOne({ where: { userId } });
  }

  async addMovieToList(userId: number, movieId: number) {
    const list = await List.findOne({ where: { userId } });

    if (list) {
      return await List.update(
        { moviesId: [...list.moviesId, movieId] },
        { where: { userId } }
      );
    } else {
      return await List.create({ userId, moviesId: [movieId] } as listDTO);
    }
  }

  async removeMovieFromList(userId: number, movieId: number) {
    const list = await List.findOne({ where: { userId } });

    if (list) {
      return await List.update(
        { moviesId: list.moviesId.filter((id) => id !== movieId) },
        { where: { userId } }
      );
    } else {
      return { message: "List not found" };
    }
  }
}

export default new ListService();
