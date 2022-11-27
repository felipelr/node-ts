import { Column, Entity } from "typeorm";
import { BaseWithDatesEntity } from "./BaseWithDatesEntity";

@Entity({name: "users"})
export class User extends BaseWithDatesEntity {

  @Column({name: "email"})
  email: string;

  @Column({name: "password"})
  password: string;
}
