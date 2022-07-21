import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {

    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @CreateDateColumn({name: "created"})
    created?: Date;

    @UpdateDateColumn({name: "modified"})
    modified?: Date;
}