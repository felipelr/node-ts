import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ClientServiceOrder } from "./ClientServiceOrder";
import { Professional } from "./Professional";

@Entity({name: "professionals_service_orders"})
export class ProfessionalServiceOrder extends BaseEntity {

    @Column({name: "clients_service_orders_id"})
    clients_service_orders_id: number;

    @Column({name: "professional_id"})
    professional_id: number;

    @Column({name: "description"})
    description: string;

    @Column({name: "service_value"})
    service_value: number;

    @ManyToOne(() => ClientServiceOrder)
    @JoinColumn({ name: 'clients_service_orders_id' })
    clientServiceOrder: ClientServiceOrder

    @ManyToOne(() => Professional)
    @JoinColumn({ name: 'professional_id' })
    professional: Professional
}