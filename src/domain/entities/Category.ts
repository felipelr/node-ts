import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({name: "categories"})
export class Category extends BaseEntity {

    @Column({name: "description"})
    description: string;

    @Column({name: "icon"})
    icon: string;
}