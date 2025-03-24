import { CourseResolver } from './course.resolver';
import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from './models/course.entity';
import { CourseService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [ConsoleLogger, CourseService, CourseResolver],
  exports: [CourseService],
})
export class CourseModule {}
