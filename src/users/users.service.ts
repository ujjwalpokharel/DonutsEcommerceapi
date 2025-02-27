import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from '../../utils/constants';
import { User } from './entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userModel: typeof User,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userValidation = await this.userModel.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (userValidation) {
      throw new BadRequestException('user with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const allUser = await this.userModel.findAll({ include: [Order] });
    if (!allUser) {
      throw new InternalServerErrorException('Error fetching users');
    }
    return allUser;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`user  not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`user not found`);
    }
    await this.userModel.update(updateUserDto, { where: { id } });
    return this.userModel.findOne({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.userModel.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(
        `user with ID ${id} not found. so can't be deleted`,
      );
    }
    await this.userModel.destroy({ where: { id } });
    return 'user is sucessfully deleted ';
  }
}
