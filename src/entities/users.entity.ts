import { getRounds, hashSync } from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @CreateDateColumn({ type: 'date' })
  createdAt: string | Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: string | Date;

  @DeleteDateColumn({ type: 'date' })
  deletedAt: string | Date;

  @BeforeInsert()
  @BeforeUpdate()
  encriptedPass() {
    const passHashed: number = getRounds(this.password);

    if (!passHashed) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
