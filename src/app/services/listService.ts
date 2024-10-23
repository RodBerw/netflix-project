import { listDTO } from "../dtos/listDTO";
import { List } from "../models/list";

class ListService {
  async getListFromUserId(userId: number) {
    return await List.findOne({ where: { userId } });
  }

  async createList(userId: number, movieId: number) {
    return await List.create({ userId, moviesId: [movieId] } as listDTO);
  }

  async updateList(id: number, movieId: number) {
    const list = await List.findOne({ where: { id } });

    if (list) {
      return await List.update(
        { moviesId: [...list.moviesId, movieId] },
        { where: { id } }
      );
    }
  }

  async removeMovieFromList(id: number, movieId: number) {
    const list = await List.findOne({ where: { id } });

    if (list) {
      return await List.update(
        { moviesId: list.moviesId.filter((itemId) => itemId !== movieId) },
        { where: { id } }
      );
    } else {
      return { message: "List not found" };
    }
  }
}

export default new ListService();
