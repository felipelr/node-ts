import { Column, Entity } from "typeorm";
import { BaseWithDatesEntity } from "./BaseWithDatesEntity";

@Entity({name: "categories"})
export class Category extends BaseWithDatesEntity {

    @Column({name: "description"})
    description: string;

    @Column({name: "icon"})
    icon: string;
}