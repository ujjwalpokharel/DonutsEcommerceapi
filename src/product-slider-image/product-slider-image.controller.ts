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
} from '@nestjs/common';
import { ProductSliderImageService } from './product-slider-image.service';
import { CreateProductSliderImageDto } from './dto/create-product-slider-image.dto';
import { UpdateProductSliderImageDto } from './dto/update-product-slider-image.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';
import { FileInterceptor } from '@nestjs/platform-express';
@UseGuards(JwtAuthGuard)
@Controller('product-slider-image')
export class ProductSliderImageController {
  constructor(
    private readonly productSliderImageService: ProductSliderImageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductSliderImageDto: CreateProductSliderImageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productSliderImageService.create(
      createProductSliderImageDto,
      image.buffer,
      image.originalname,
    );
  }

  @Get()
  findAll() {
    return this.productSliderImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSliderImageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductSliderImageDto: UpdateProductSliderImageDto,
  ) {
    return this.productSliderImageService.update(
      +id,
      updateProductSliderImageDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSliderImageService.remove(+id);
  }
}
