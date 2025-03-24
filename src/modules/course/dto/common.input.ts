import { Field, InputType } from '@nestjs/graphql';

@InputType()
class OrderTime {
  @Field({
    description: '开始时间',
  })
  startTime: string;

  @Field({
    description: '结束时间',
  })
  endTime: string;

  @Field({
    description: 'key',
  })
  key: number;
}

@InputType()
export class ReducibleTime {
  @Field({
    description: '日期',
  })
  week: string;

  @Field(() => [OrderTime], {
    description: '可约时间 json',
  })
  orderTime: OrderTime[];
}
