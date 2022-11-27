import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({name: "countries"})
export class Country extends BaseEntity {

    @Column({name: "code"})
    code: number;

    @Column({name: "description"})
    description: string;

    @Column({name: "description_pt"})
    description_pt: string;

    @Column({name: "initials"})
    initials: string;
}