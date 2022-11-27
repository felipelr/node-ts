import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseWithDatesEntity } from "./BaseWithDatesEntity";
import { Subcategory } from "./Subcategory";

@Entity({name: "services"})
export class Service extends BaseWithDatesEntity {

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