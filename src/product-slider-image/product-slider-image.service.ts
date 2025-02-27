import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProductSliderImageDto } from './dto/create-product-slider-image.dto';
import { UpdateProductSliderImageDto } from './dto/update-product-slider-image.dto';
import { PRODUCT_IMAGE_SLIDER } from 'utils/constants';
import { ProductSliderImage } from './entities/product-slider-image.entity';
import * as AWS from 'aws-sdk';

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
    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3();
    const key = `${timeStamp}-${imagename}`;
    const s3Response = await s3
      .upload({
        Bucket: process.env.BUCKET_NAME,
        Body: dataBuffer,
        Key: key,
      })
      .promise();
    const sliderData = {
      ...createProductSliderImageDto,
      image: s3Response.Location,
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
    const imageUrl = singleImage.image;
    const imageKey = imageUrl.split('/').pop(); 
    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3();
    await s3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: imageKey,
    })
    .promise();
    await this.sliderModel.destroy({ where: { id } });
    return `Image deleted successfully`;
  }
}
