import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Client } from "./Client";
import { Service } from "./Service";

@Entity({name: "clients_service_orders"})
export class ClientServiceOrder extends BaseEntity {

    @Column({name: "client_id"})
    client_id: number;

    @Column({name: "client_address_id"})
    client_address_id: number;

    @Column({name: "service_id"})
    service_id: number;

    @Column({name: "professional_selected"})
    professional_selected: number;

    @Column({name: "quantity"})
    quantity: number;

    @Column({name: "quantity_professionals"})
    quantity_professionals: number;

    @Column({name: "description"})
    description: string;

    @Column({name: "status"})
    status: string;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'client_id' })
    client: Client

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'service_id' })
    service: Service
}