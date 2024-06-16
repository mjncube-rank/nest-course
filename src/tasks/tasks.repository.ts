// import { EntityRepository, Repository } from 'typeorm';
// import { TaskEntity } from './task.entity';
// import { CreateTaskDTO } from './dto/create-task.dto';
// import { TaskStatus } from './task-status.enum';

// @EntityRepository(TaskEntity)
// export class TasksRepository extends Repository<TaskEntity> {
//   async createTask(createTaskDTO: CreateTaskDTO): Promise<TaskEntity> {
//     const { title, description } = createTaskDTO;

//     const task = this.create({
//       title: title,
//       description: description,
//       status: TaskStatus.OPEN,
//     });

//     await this.save(task);

//     return task;
//   }
// }

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async createTask({ title, description }: CreateTaskDTO): Promise<TaskEntity> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }
}
