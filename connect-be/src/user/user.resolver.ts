import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserService } from './user.service';
import { CreateUserInput } from './create-user.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType)
  async getUser() {}

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }
}
