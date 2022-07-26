import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "ratings" })
export class Rating extends BaseEntity {

    @Column({ name: "professional_id" })
    professional_id: number;

    @Column({ name: "client_id" })
    client_id: number;

    @Column({ name: "call_id" })
    call_id: number;

    @Column({ name: "rate" })
    rate: number;

    @Column({ name: "description" })
    description: string;
}
