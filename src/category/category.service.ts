import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CATEGORY_REPOSITORY } from 'utils/constants';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryModel: typeof Category,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const categoryCheck = await this.categoryModel.findOne({
      where: {
        category_name: createCategoryDto.category_name,
      },
    });
    if (categoryCheck) {
      throw new BadRequestException(
        'Category already exist, you can not create the category with same name.',
      );
    }
    const category = await this.categoryModel.create(createCategoryDto);
    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryModel.findAll({
      include: { all: true },
    });
    if (!categories) {
      throw new InternalServerErrorException('Error fetching category');
    }
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const singleCategory = await this.categoryModel.findByPk(id, {
      include: { all: true },
    } );
    if (!singleCategory) {
      throw new NotFoundException(`category with ID ${id} not found`);
    }
    return singleCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const singleCategory = await this.categoryModel.findOne({ where: { id } });
    if (!singleCategory) {
      throw new NotFoundException(`category with ID ${id} not found`);
    }
    await this.categoryModel.update(updateCategoryDto, { where: { id } });
    return this.categoryModel.findOne({ where: { id } });
  }

  async remove(id: number) {
    const singleCategory = await this.categoryModel.findOne({ where: { id } });
    if (!singleCategory) {
      throw new NotFoundException(
        `category with ID ${id} not found. so cann't delete category.`,
      );
    }
    await this.categoryModel.destroy({ where: { id } });
    return `category sucessfully deleted`;
  }
}
