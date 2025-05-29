import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // look like creating a fake module on the fly
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).overrideProvider(UsersService)
      .useValue(mockUserService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

/*   it('should be defined', () => {
    expect(controller).toBeDefined();
  }); */

  describe('create', () => {
    it('should create a user successfully', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        name: 'Nawrz Qal',
        email: 'nawrzqal@gmail.com',
        password: 'password',
        userType: 'admin',
      };
      
      const expectedResult = {
        _id: '507f1f77bcf86cd799439011',
        name: 'Nawrz Qal',
        email: 'nawrzqal@gmail.com',
        userType: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockUserService.create.mockResolvedValue(expectedResult);
      
      // Act
      const result = await controller.create(createUserDto);
      
      // Assert
      expect(result).toEqual(expectedResult);
      //expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
      //expect(mockUserService.create).toHaveBeenCalledTimes(1);
    });
    
    it('should handle errors when user creation fails', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        name: 'Nawrz Qal',
        email: 'existing@gmail.com',
        password: 'password',
        userType: 'admin',
      };
      
      const error = new ConflictException('Email already exists');
      mockUserService.create.mockRejectedValue(error);
      
      // Act & Assert
      expect(controller.create(createUserDto)).rejects.toThrow(ConflictException);
      //expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
      //expect(mockUserService.create).toHaveBeenCalledTimes(1);
    });
  });
});
