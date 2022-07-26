import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({name: "favorite_professionals"})
export class FavoriteProfessional extends BaseEntity {

    @Column({name: "user_id"})
    user_id: number;

    @Column({name: "professional_id"})
    professional_id: number;
}