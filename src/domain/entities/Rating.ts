import { Column, Entity } from "typeorm";
import { BaseWithDatesEntity } from "./BaseWithDatesEntity";

@Entity({ name: "ratings" })
export class Rating extends BaseWithDatesEntity {

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
