import { Column, Entity } from "typeorm";
import { BaseWithDatesEntity } from "./BaseWithDatesEntity";

@Entity({name: "clients"})
export class Client extends BaseWithDatesEntity {

    @Column({name: "name"})
    name: string;

    @Column({name: "user_id"})
    user_id: number;

    @Column({name: "photo"})
    photo: string;
}