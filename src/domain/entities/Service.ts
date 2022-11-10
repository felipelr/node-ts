import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Subcategory } from "./Subcategory";

@Entity({name: "services"})
export class Service extends BaseEntity {

    @Column({name: "subcategory_id"})
    subcategory_id: number;

    @Column({name: "title"})
    title: string;

    @Column({name: "description"})
    description: string;

    @ManyToOne(() => Subcategory)
    @JoinColumn({ name: 'subcategory_id' })
    subcategory: Subcategory
}