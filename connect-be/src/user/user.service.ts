import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login.input';
import { JwtPayload } from './jwl-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async createUser({
    firstName,
    lastName,
    email,
    gender,
    password,
    dob,
  }: CreateUserInput) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      id: uuid(),
      firstName,
      lastName,
      email,
      password: hashPassword,
      gender,
      dob,
    });

    return this.userRepository.save(user);
  }

  getUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }
  getUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async login({ email, password }: LoginInput): Promise<LoginResponse> {
    const user = await this.getUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = this.jwtService.sign(payload);
      return { access_token: accessToken, user };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
