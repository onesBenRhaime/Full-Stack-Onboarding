import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should return a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'test',
        password: 'password',
        email: 'test@example.com',
        role: 'user',
      };
      const result = { id: 1, ...createUserDto, password: 'hashedPassword' };
      jest.spyOn(authService, 'register').mockResolvedValue(result as any);

      expect(await controller.register(createUserDto)).toEqual(result);
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { email: 'test@test.tn', id: 1 };
      const result = { access_token: 'token' };
      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await controller.login({ user })).toEqual(result);
    });
  });
});
