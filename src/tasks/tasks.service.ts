import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { GetTaskFilteredDTO } from './dto/get-task-filtered.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  //GET TASK
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTaskFilteredDTO): Task[] {
    const { search, status } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          task.description
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        ) {
          return true;
        }
      });
    }

    return tasks;
  }

  //GET TASK BY ID
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException();
    } else {
      return found;
    }
  }

  //DELETE TASK
  deleteTask(id: string): void {
    //using getTaskById to use its validation
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
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
