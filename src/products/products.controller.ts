import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productsService.create(
      createProductDto,
      image.buffer,
      image.originalname,
    );
  }

  @Get()
  findAll(@Query('categoryIds') categoryIds: string) {
    let categoryIdsArray: number[] = [];

    if (categoryIds) {
      categoryIdsArray = categoryIds
        .split(',')
        .filter((id) => id !== '')
        .map(Number);
    }

    return this.productsService.findAll(categoryIdsArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productsService.update(
      +id,
      updateUserDto,
      image.buffer,
      image.originalname,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
