import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @MinLength(2)
  @MaxLength(20)
  @Field()
  firstName: string;

  @MinLength(2)
  @MaxLength(20)
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Please provide at least 1 upper case, 1 lower case, 1 number, 1 special character',
  })
  @Field()
  password: string;

  @Field()
  gender: string;

  @Field()
  dob: string;
}
