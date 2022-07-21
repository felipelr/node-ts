import { User } from "../entities/User";
import { IBaseRepository } from "./IBaseRepository";

export interface IUsersRepository extends IBaseRepository<User> {
    authenticate(email: string, password: string): Promise<User>
}