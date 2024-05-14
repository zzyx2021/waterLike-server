import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudent {
  @Field()
  name?: string;
  @Field()
  password?: string;
}
