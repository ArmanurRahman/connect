import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login.response';
import { LoginInput } from './dto/login.input';
import { UserService } from './user.service';

@Resolver()
export class AuthResolver {
  constructor(private userService: UserService) {}
  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') { email, password }: LoginInput) {
    return await this.userService.login({ email, password });
  }
}
