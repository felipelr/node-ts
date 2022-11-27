import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { State } from "./State";

@Entity({name: "cities"})
export class City extends BaseEntity {

    @Column({name: "state_id"})
    state_id: number;

    @Column({name: "name"})
    name: string;

    @ManyToOne(() => State)
    @JoinColumn({ name: 'state_id' })
    state: State
}