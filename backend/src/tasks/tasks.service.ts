import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
  ) {}

  findAll(userId: number) {
    return this.repo.find({
      where: { userId },
    });
  }

  create(dto: { title: string }, userId: number) {
    const task = this.repo.create({
      title: dto.title,
      userId,
    });

    return this.repo.save(task);
  }

  async updateStatus(id: number, status: TaskStatus, userId: number) {
    const task = await this.repo.findOne({
      where: { id, userId },
    });

    if (!task) return null;

    task.status = status;

    return this.repo.save(task);
  }

  async remove(id: number, userId: number) {
    return this.repo.delete({ id, userId });
  }
}
