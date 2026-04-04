import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ CORRECT
    PrismaModule, StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}