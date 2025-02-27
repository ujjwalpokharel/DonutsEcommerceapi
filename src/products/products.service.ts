import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Op } from 'sequelize';
import { Category } from 'src/category/entities/category.entity';
import { ProductSliderImage } from 'src/product-slider-image/entities/product-slider-image.entity';
import { CATEGORY_REPOSITORY, PRODUCT_REPOSITORY } from '../../utils/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productModel: typeof Product,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryModel: typeof Category,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    dataBuffer: Buffer,
    imagename: string,
  ): Promise<Product> {
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
    const productData = { ...createProductDto, image:imageUrl};
    const product = await this.productModel.create(productData);
    if (
      createProductDto.categoryIds &&
      createProductDto.categoryIds.length > 0
    ) {
      const categories = await this.categoryModel.findAll({
        where: { id: createProductDto.categoryIds },
      });
      await product.$set('categories', categories);
    }

    return product;
  }

  async findAll(categoryIdsArray: number[]): Promise<Product[]> {
    if (!categoryIdsArray || categoryIdsArray.length === 0) {
      const allProduct = await this.productModel.findAll({
        include: [Category, ProductSliderImage],
      });
      if (!allProduct) {
        throw new InternalServerErrorException('Error fetching Products');
      }
      return allProduct;
    }

    return this.productModel.findAll({
      include: [
        {
          model: Category,
          where: {
            id: {
              [Op.in]: categoryIdsArray,
            },
          },
        },
      ],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id, {
      include: [Category, ProductSliderImage],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    dataBuffer: Buffer,
    imagename,
  ): Promise<Product> {
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
    const imageUrl = `http://localhost:3001/imageUploads/${imagename}`;
    const productData = { ...updateProductDto, image: imageUrl };
    const product = await this.productModel.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productModel.update(productData, { where: { id } });
    if (updateProductDto.categoryIds) {
      const categories = await Category.findAll({
        where: { id: updateProductDto.categoryIds },
      });
      await product.$set('categories', categories);
    }
    return this.productModel.findOne({ where: { id } });
  }

  async remove(id: number): Promise<string> {
    const product = await this.productModel.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(
        `Product with ID ${id} not found. so can't be deleted`,
      );
    }
    await this.productModel.destroy({ where: { id } });
    return 'Product is sucessfully deleted ';
  }
}
