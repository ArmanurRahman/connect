import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserService } from './user.service';
import { CreateUserInput } from './create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../user/jwt-auth.guard';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType)
  @UseGuards(JwtAuthGuard)
  async getUserById(@Args('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }
}
