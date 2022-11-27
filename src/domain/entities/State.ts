import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Country } from "./Country";

@Entity({name: "states"})
export class State extends BaseEntity {

    @Column({name: "country_id"})
    country_id: number;

    @Column({name: "name"})
    name: string;

    @Column({name: "initials"})
    initials: string;

    @ManyToOne(() => Country)
    @JoinColumn({ name: 'country_id' })
    country: Country
}