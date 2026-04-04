import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.student.create({ data });
  }

  findAll() {
    return this.prisma.student.findMany();
  }
}