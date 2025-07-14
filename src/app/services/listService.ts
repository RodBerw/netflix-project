import { parse } from "path";
import { listDTO } from "../dtos/listDTO";
import { List } from "../models/list";

class ListService {
  async getListFromUserId(userId: number) {
    return await List.findOne({ where: { userId } });
  }

  async createList(userId: number, movieId: number) {
    return await List.create({
      userId,
      moviesId: JSON.stringify([movieId]),
    } as listDTO);
  }

  async updateList(userId: number, movieId: number) {
    const list = await List.findOne({ where: { userId } });

    if (list) {
      return await List.update(
        { moviesId: JSON.stringify([...JSON.parse(list.moviesId), movieId]) },
        { where: { userId } }
      );
    }
  }

  async removeMovieFromList(id: number, movieId: number) {
    const list = await List.findOne({ where: { id } });

    if (list) {
      return await List.update(
        {
          moviesId: JSON.stringify([
            ...JSON.parse(list.moviesId).filter((id: number) => id !== movieId),
          ]),
        },
        { where: { id } }
      );
    } else {
      return { message: "List not found" };
    }
  }
}

export default new ListService();
