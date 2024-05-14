import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './dto/user-input.type';
import { UserType } from './dto/user.type';
import { Result } from '@/common/dto/result.type';
import { SUCCESS, UPDATE_ERROR } from '@/common/constants/code';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean, { description: '新增用户' })
  async create(@Args('param') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Mutation(() => Result, { description: '更新用户信息' })
  async updateUserInfo(@Args('id') id: string, @Args('params') params: UserInput): Promise<Result> {
    const res = await this.userService.update(id, params);
    if (res) {
      return {
        code: SUCCESS,
        message: '更新成功',
      };
    }
    return {
      code: UPDATE_ERROR,
      message: '更新失败',
    };
  }

  @Query(() => UserType, { description: '使用ID查询用户' })
  async Find(@Args('id') id: string): Promise<UserType> {
    return await this.userService.find(id);
  }

  @Query(() => UserType, { description: '使用 ID 获取用户信息' })
  async getUserInfo(@Context() cxt: any): Promise<UserType> {
    const id = cxt.req.user?.id;
    return await this.userService.find(id);
  }

  @Query(() => Boolean, { description: '更新用户' })
  async update(@Args('id') id: string, @Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.update(id, params);
  }

  @Query(() => Boolean, { description: '删除用户' })
  async del(@Args('id') id: string): Promise<boolean> {
    return await this.userService.del(id);
  }
}
