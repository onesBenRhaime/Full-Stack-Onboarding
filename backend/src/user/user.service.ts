import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findByIdWithRoles(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['roles'], // Inclure les rôles
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    //user par defaut
    const role = await this.roleRepository.findOneBy({ name: 'admin' });
    user.roles = [role];

    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async assignRole(id: number, roleName: string): Promise<User> {
    const user = await this.findOne(id);
    const role = await this.roleRepository.findOneBy({ name: roleName });

    if (!role) {
      throw new Error('Role not found');
    }

    if (!user.roles) {
      user.roles = [];
    }

    user.roles.push(role);

    return await this.userRepository.save(user);
  }

  // async findOne(id: number): Promise<User> {
  //   return await this.userRepository.findOne({
  //     where: { id },
  //     relations: ['roles'], // Assurez-vous que les rôles sont chargés
  //   });
  // }

  // async assignRole(id: number, roleName: string): Promise<User> {
  //   const user = await this.findOne(id);
  //   const role = await this.roleRepository.findOneBy({ name: roleName });

  //   if (!role) {
  //     throw new Error('Role not found');
  //   }

  //   user.roles.push(role);
  //   return await this.userRepository.save(user);
  // }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
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
