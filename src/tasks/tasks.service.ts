import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { GetTaskFilteredDTO } from './dto/get-task-filtered.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  //::get from local
  // private tasks: Task[] = [];
  //::get from DB
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}
  // //GET TASK
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilters(filterDto: GetTaskFilteredDTO): Task[] {
  //   const { search, status } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (
  //         task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
  //         task.description
  //           .toLocaleLowerCase()
  //           .includes(search.toLocaleLowerCase())
  //       ) {
  //         return true;
  //       }
  //     });
  //   }

  //   return tasks;
  // }

  // //GET TASK BY ID
  async getTaskById(id: string): Promise<TaskEntity> {
    const found = await this.taskRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException();
  //   } else {
  //     return found;
  //   }
  // }

  // //DELETE TASK
  // deleteTask(id: string): void {
  //   //using getTaskById to use its validation
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // //UPDATE TASK
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  // //CREATE TASK

  async createTask(createTaskDTO: CreateTaskDTO): Promise<TaskEntity> {
    const { title, description } = createTaskDTO;

    const task = this.taskRepository.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(task);

    return task;
  }
  // //Alt method
  // // createTask(createTaskDTO: CreateTaskDTO): Task {
  // createTask(title: string, description: string): Task {
  //   //const {title, description} = createTaskDTO
  //   const task: Task = {
  //     id: uuid(),
  //     title: title,
  //     description: description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }
}
