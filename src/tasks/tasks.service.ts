import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  //GET TASK
  getAllTasks(): Task[] {
    return this.tasks;
  }

  //GET TASK BY ID
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  //DELETE TASK
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  //UPDATE TASK
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  //CREATE TASK
  //Alt method
  // createTask(createTaskDTO: CreateTaskDTO): Task {
  createTask(title: string, description: string): Task {
    //const {title, description} = createTaskDTO
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
