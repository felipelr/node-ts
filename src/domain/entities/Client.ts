import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({name: "clients"})
export class Client extends BaseEntity {

    @Column({name: "name"})
    name: string;

    @Column({name: "user_id"})
    user_id: number;

    @Column({name: "photo"})
    photo: string;
}