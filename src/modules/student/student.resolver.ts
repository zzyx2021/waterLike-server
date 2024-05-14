import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { SUCCESS, STUDENT_NOT_EXIST } from '@/common/constants/code';
import { StudentResult, StudentResults } from './dto/result-student.output';
import { StudentInput } from './dto/student.input';
import { StudentService } from './student.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { PageInput } from '@/common/dto/page.input';
import { CreateStudent } from './dto/student-input.type';
import { StudentType } from './dto/student.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => StudentResult)
  async getStudentInfo(@CurUserId() id: string): Promise<StudentResult> {
    const result = await this.studentService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: '用户信息不存在',
    };
  }

  @Mutation(() => Boolean, { description: '新增用户' })
  async studentRegister(@Args('params') params: CreateStudent): Promise<boolean> {
    return await this.studentService.create(params);
  }

  @Mutation(() => StudentResult)
  async commitStudentInfo(
    @Args('params') params: StudentInput,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const student = await this.studentService.findById(userId);
    if (student) {
      const res = await this.studentService.updateById(student.id, params);
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: '用户信息不存在',
    };
  }

  @Query(() => StudentResults)
  async getStudents(@Args('page') page: PageInput): Promise<StudentResults> {
    const { pageNum, pageSize } = page;
    const [results, total] = await this.studentService.findStudents({
      start: pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
      length: pageSize,
    });
    return {
      code: SUCCESS,
      data: results,
      page: {
        pageNum,
        pageSize,
        total,
      },
      message: '获取成功',
    };
  }
}
