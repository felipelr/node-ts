import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Professional } from "./Professional";
import { Service } from "./Service";

@Entity({name: "professional_services"})
export class ProfessionalService extends BaseEntity {

    @Column({name: "service_id"})
    service_id: number;

    @Column({name: "professional_id"})
    professional_id: number;

    @Column({name: "rating"})
    rating: number;

    @Column({name: "amount_ratings"})
    amount_ratings: number;

    @Column({name: "active"})
    active: boolean;

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'service_id' })
    service: Service

    @ManyToOne(() => Professional)
    @JoinColumn({ name: 'professional_id' })
    professional: Professional
}