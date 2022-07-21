import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({name: "professionals"})
export class Professional extends BaseEntity {

    @Column({name: "name"})
    name: string;
    
    @Column({name: "description"})
    description: string;

    @Column({name: "user_id"})
    user_id: number;

    @Column({name: "photo"})
    photo: string;
}