import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({name: "subcategories"})
export class Subcategory extends BaseEntity {

    @Column({name: "category_id"})
    category_id: number;

    @Column({name: "description"})
    description: string;

    @Column({name: "icon"})
    icon: string;
}