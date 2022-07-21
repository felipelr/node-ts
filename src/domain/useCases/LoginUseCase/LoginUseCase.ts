import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ILoginResultDto } from "./ILoginResultDto";
import { ILoginDto } from "./ILoginDto";
import { IClientsRepository } from "../../repositories/IClientsRepository";
import { IProfessionalsRepository } from "../../repositories/IProfessionalsRepository";

export class LoginUseCase {

    constructor(private usersRepository: IUsersRepository,
        private clientsRepository: IClientsRepository,
        private professionalsRepository: IProfessionalsRepository) {
    }

    async execute(data: ILoginDto): Promise<ILoginResultDto> {
        const { id, email } = await this.usersRepository.authenticate(data.email, data.password);
        const client = await this.clientsRepository.getByUserId(id);
        const professional = await this.professionalsRepository.getByUserId(id);
        return { id, email, client, professional };
    }
}