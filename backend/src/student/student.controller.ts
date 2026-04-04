import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() body: any) {
    return this.studentService.create(body);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }
}