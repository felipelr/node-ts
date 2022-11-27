import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { City } from "./City";
import { Professional } from "./Professional";

@Entity({name: "professional_cities"})
export class ProfessionalCity extends BaseEntity {

    @Column({name: "city_id"})
    city_id: number;

    @Column({name: "professional_id"})
    professional_id: number;

    @ManyToOne(() => City)
    @JoinColumn({ name: 'city_id' })
    city: City

    @ManyToOne(() => Professional)
    @JoinColumn({ name: 'professional_id' })
    professional: Professional
}