import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ADMIN_REPOSITORY } from 'utils/constants';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    @Inject(ADMIN_REPOSITORY) private readonly adminModel: typeof Admin,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const adminValidation = await this.adminModel.findOne({
      where: {
        email: createAdminDto.email,
      },
    });
    if (adminValidation) {
      throw new BadRequestException('Admin with this Email already exists');
    }
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const user = await this.adminModel.create({
      ...createAdminDto,
      password: hashedPassword,
    });
    return 'Admin created';
  }

  findAll() {
    return `This action returns all admins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
