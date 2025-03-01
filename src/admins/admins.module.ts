import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { adminProvider } from './admins.provider';

@Module({
  imports: [SequelizeModule.forFeature([Admin])],
  controllers: [AdminsController],
  providers: [AdminsService, ...adminProvider, Admin],
  exports: [AdminsService],
})
export class AdminsModule {}
