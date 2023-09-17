import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  dob: string;

  @Field()
  gender: string;
}
