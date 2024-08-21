import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../../role/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsString()
  readonly role: Role;
}
