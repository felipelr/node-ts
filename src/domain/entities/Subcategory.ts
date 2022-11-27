import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseWithDatesEntity } from "./BaseWithDatesEntity";
import { Category } from "./Category";

@Entity({name: "subcategories"})
export class Subcategory extends BaseWithDatesEntity {

    @Column({name: "category_id"})
    category_id: number;

    @Column({name: "description"})
    description: string;

    @Column({name: "icon"})
    icon: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category
}