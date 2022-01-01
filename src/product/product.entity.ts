// how you create tables using typeorm
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

 @Entity()
 export class Product {
  @PrimaryGeneratedColumn() // PK
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({default: 0})
  likes: number;
 }