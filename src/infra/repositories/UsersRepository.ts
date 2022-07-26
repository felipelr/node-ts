import { Repository, DataSource } from "typeorm";
import { User } from "../../domain/entities/User";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import bcryptjs from "bcryptjs";

export class UsersRepository implements IUsersRepository {
    private _baseRepository: Repository<User>;

    constructor(dataSource: DataSource) {
        this._baseRepository = dataSource.getRepository(User);
    }

    async insert(entity: User): Promise<User> {
        const _new = await this._baseRepository.create(entity);
        return await this._baseRepository.save(_new);
    }

    async update(entity: User): Promise<User> {
        const _old = await this._baseRepository.findOneBy({ id: entity.id });
        this._baseRepository.merge(_old, entity);
        return await this._baseRepository.save(entity);
    }

    async delete(id: number): Promise<void> {
        await this._baseRepository.delete(id);
    }

    async getById(id: number): Promise<User> {
        return await this._baseRepository.findOneByOrFail({ id });
    }

    async getAll(): Promise<User[]> {
        return await this._baseRepository.find({ order: { id: "ASC" } });
    }

    async authenticate(email: string, password: string): Promise<User> {
        const user = await this._baseRepository.findOneByOrFail({ email });
        const verified = await bcryptjs.compare(password, user.password);
        if (verified)
            return user;
        throw new Error("Email e/ou senha inválidos.")
    }
}