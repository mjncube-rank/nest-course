import { CreateTaskDTO } from './dto/create-task.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    //Alt method
    // return this.taskService.createTask(createTaskDTO)
    return this.taskService.createTask(
      createTaskDTO.title,
      createTaskDTO.description,
    );
  }
}
