import { Field, ObjectType } from '@nestjs/graphql';
import { UserType as User } from '../user.type';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
