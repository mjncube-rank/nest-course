import { CreateTaskDTO } from './dto/create-task.dto';
import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  // Patch,
  Post,
  // Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { GetTaskFilteredDTO } from './dto/get-task-filtered.dto';
// import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { TaskEntity } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // // getAllTasks(): Task[] {
  // getTasks(@Query() filterDto: GetTaskFilteredDTO): Task[] {
  //   // if we have any filters defined then use taskService.getTaskWithFilters
  //   //otherwise, just get all tasks
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTaskWithFilters(filterDto);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.getTaskById(id);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.taskService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   // @Body('status') status: TaskStatus,
  //   @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  // ): Task {
  //   return this.taskService.updateTaskStatus(id, updateTaskStatusDTO.status);
  // }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<TaskEntity> {
    return this.taskService.createTask(createTaskDTO);
  }
}
