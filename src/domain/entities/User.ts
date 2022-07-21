import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({name: "users"})
export class User extends BaseEntity {

  @Column({name: "email"})
  email: string;

  @Column({name: "password"})
  password: string;
}
