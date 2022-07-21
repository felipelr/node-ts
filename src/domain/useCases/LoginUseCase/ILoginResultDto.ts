import { Client } from "../../entities/Client";
import { Professional } from "../../entities/Professional";
import { User } from "../../entities/User";

export interface ILoginResultDto {
    id: number;
    email: string;
    client?: Client;
    professional?: Professional;
}