import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    findByUsername: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if valid', async () => {
      const result = { id: 1, username: 'test', password: 'hashedPassword' };
      jest
        .spyOn(userService, 'findByUsername')
        .mockResolvedValue(result as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const user = await service.validateUser('test', 'password');
      expect(user).toEqual({ id: 1, username: 'test' });
    });

    it('should return null if invalid', async () => {
      jest.spyOn(userService, 'findByUsername').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const user = await service.validateUser('test', 'password');
      expect(user).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const result = { access_token: 'token' };
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const user = { username: 'test', id: 1 };
      expect(await service.login(user)).toEqual(result);
    });
  });

  describe('register', () => {
    it('should create a user and return it', async () => {
      const createUserDto: CreateUserDto = {
        username: 'test',
        password: 'password',
        email: 'test@example.com',
        role: 'user',
      };
      const hashedPassword = 'hashedPassword';
      const user = { id: 1, ...createUserDto, password: hashedPassword };
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      jest.spyOn(userService, 'create').mockResolvedValue(user as any);

      expect(await service.register(createUserDto)).toEqual(user);
    });
  });
});
