import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService, // Inject the RoleService to fetch roles
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const roles = user.roles ? user.roles.map((r) => r.name) : [];
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
      role: roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    // password is provided ?
    if (!createUserDto.password) {
      throw new Error('Password is required');
    }

    const userExists = await this.userService.findByUsername(
      createUserDto.email,
    );
    if (userExists) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // role
    const userRole = await this.roleService.findOneByName('user');
    if (!userRole) {
      throw new Error('Default role not found');
    }

    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
      role: userRole,
    });

    return user;
  }
}
