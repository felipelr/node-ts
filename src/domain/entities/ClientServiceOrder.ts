import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";
import { Client } from "./Client";
import { ProfessionalServiceOrder } from "./ProfessionalServiceOrder";
import { Service } from "./Service";
import { Subcategory } from "./Subcategory";

@Entity({name: "clients_service_orders"})
export class ClientServiceOrder extends BaseEntity {

    @Column({name: "client_id"})
    client_id: number;

    @Column({name: "client_address_id"})
    client_address_id: number;

    @Column({name: "service_id"})
    service_id: number;

    @Column({name: "subcategory_id"})
    subcategory_id: number;

    @Column({name: "category_id"})
    category_id: number;

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

    @ManyToOne(() => Subcategory)
    @JoinColumn({ name: 'subcategory_id' })
    subcategory: Subcategory

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category

    @OneToMany(() => ProfessionalServiceOrder, (professionalServiceOrder) => professionalServiceOrder.clientServiceOrder)
    professionalServiceOrders: ProfessionalServiceOrder[]
}