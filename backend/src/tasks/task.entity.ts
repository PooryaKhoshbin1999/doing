import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'todo' })
  status: TaskStatus;

  @Column()
  userId: number;
}
