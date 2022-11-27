import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export class BaseWithDatesEntity extends BaseEntity {

    @CreateDateColumn({ name: "created" })
    created?: Date;

    @UpdateDateColumn({ name: "modified" })
    modified?: Date;
}