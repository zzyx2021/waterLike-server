import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Page {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  pageNum?: number;
  @Field(() => Int)
  pageSize?: number;
}

export default Page;
