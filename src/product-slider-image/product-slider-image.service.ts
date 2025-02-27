import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProductSliderImageDto } from './dto/create-product-slider-image.dto';
import { UpdateProductSliderImageDto } from './dto/update-product-slider-image.dto';
import { PRODUCT_IMAGE_SLIDER } from 'utils/constants';
import { ProductSliderImage } from './entities/product-slider-image.entity';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class ProductSliderImageService {
  constructor(
    @Inject(PRODUCT_IMAGE_SLIDER)
    private readonly sliderModel: typeof ProductSliderImage,
  ) {}
  async create(
    createProductSliderImageDto: CreateProductSliderImageDto,
    dataBuffer: Buffer,
    imagename: string,
  ) {
    const timeStamp = Date.now();
    const directoryName = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'imageUploads',
    );
    const imageFileName = `${timeStamp}-${imagename}`;
    const imagePath = path.join(directoryName, imageFileName);
    fs.writeFileSync(imagePath, dataBuffer);

    const imageUrl = `http://localhost:3001/imageUploads/${imagePath}`;
    const sliderData = {
      ...createProductSliderImageDto,
      image: imageUrl,
    };
    const sliderImage = await this.sliderModel.create(sliderData);
    return sliderImage;
  }

  async findAll() {
    const allImage = await this.sliderModel.findAll();
    return allImage;
  }

  async findOne(id: number) {
    const singleImage = await this.sliderModel.findOne({ where: { id } });
    if (!singleImage) {
      throw new BadRequestException(`image with id${id} don't exists`);
    }
    return singleImage;
  }

  async update(
    id: number,
    updateProductSliderImageDto: UpdateProductSliderImageDto,
  ) {
    const singleImage = await this.sliderModel.findOne({ where: { id } });
    if (!singleImage) {
      throw new BadRequestException(
        `image with id${id} don't exists so can't be updated`,
      );
    }
    await this.sliderModel.update(updateProductSliderImageDto, {
      where: { id },
    });
    return this.sliderModel.findOne({ where: { id } });
  }

  async remove(id: number) {
    const singleImage = await this.sliderModel.findOne({ where: { id } });
    if (!singleImage) {
      throw new BadRequestException(
        `image with id${id} don't exists so can't be deleted`,
      );
    }

    await this.sliderModel.destroy({ where: { id } });
    return `Image deleted successfully`;
  }
}
