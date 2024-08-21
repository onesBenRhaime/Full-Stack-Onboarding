import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async findByIdWithRoles(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'], // Inclure les rôles
    });
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    //default role is user
    const role = await this.roleRepository.findOneBy({ name: 'user' });
    user.roles = [role];

    return await this.userRepository.save(user);
  }
  // Assign a role to a user
  async assignRole(userId: number, roleName: string): Promise<User> {
    const user = await this.findOne(userId);
    const role = await this.roleRepository.findOneBy({ name: roleName });

    if (!role) {
      throw new Error('Role not found');
    }

    user.roles.push(role);
    return await this.userRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByUsername(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }
}
