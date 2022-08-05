import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({name: "services"})
export class Service extends BaseEntity {

    @Column({name: "subcategory_id"})
    subcategory_id: number;

    @Column({name: "title"})
    title: string;

    @Column({name: "description"})
    description: string;
}