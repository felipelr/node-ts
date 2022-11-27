import { Column, Entity } from "typeorm";
import { BaseWithDatesEntity } from "./BaseWithDatesEntity";

@Entity({name: "favorite_professionals"})
export class FavoriteProfessional extends BaseWithDatesEntity {

    @Column({name: "user_id"})
    user_id: number;

    @Column({name: "professional_id"})
    professional_id: number;
}