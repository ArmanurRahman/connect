import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  createUser({
    firstName,
    lastName,
    email,
    gender,
    password,
    dob,
  }: CreateUserInput) {
    const user = this.userRepository.create({
      id: uuid(),
      firstName,
      lastName,
      email,
      password,
      gender,
      dob,
    });

    return this.userRepository.save(user);
  }
}
