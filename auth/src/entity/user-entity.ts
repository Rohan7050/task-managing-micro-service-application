import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert
} from "typeorm";
import { Password } from "../services/password";
// import { AppDataSource } from "../config/data-source";

@Entity({
    name: "user"
})
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({})
  firstname!:string;

  @Column()
  lastname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Automatically hash password before saving to DB
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // Only hash if password is new or modified
    if (this.password) {
      this.password = await Password.toHash(this.password);
    }
  }

  // Method to verify password (for login)
  async comparePassword(plainPassword: string): Promise<boolean> {
    return await Password.compare(this.password, plainPassword);
  }
}

// export const userRepository = AppDataSource.getRepository(User);