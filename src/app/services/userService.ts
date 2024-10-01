import { userDTO } from "../dtos/userDTO";
import { User } from "../models/user";
import bycrypt from "bcrypt";

class UserService {
  public async createUser(user: userDTO) {
    return await User.create({
      ...user,
      password: bycrypt.hashSync(user.password, 8),
    });
  }

  public async getUsers() {
    return await User.findAll();
  }

  public async getUserById(id: number): Promise<userDTO | null> {
    return await User.findByPk(id);
  }

  public async getUserByEmail(email: string): Promise<userDTO | null> {
    return await User.findOne({ where: { email } });
  }

  public async updateUser(id: number, user: userDTO) {
    return await User.update(user, { where: { id } });
  }

  public async deleteUser(id: number) {
    return await User.destroy({ where: { id } });
  }

  public async login(password: string, hashedPassword: string) {
    return await bycrypt.compare(password, hashedPassword);
  }
}

export default new UserService();
