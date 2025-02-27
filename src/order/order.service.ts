import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ORDER_PRODUCT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
} from '../../utils/constants';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Payment } from 'src/payments/entities/payment.entity';
@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderModel: typeof Order,
    @Inject(PRODUCT_REPOSITORY) private readonly productModel: typeof Product,
    @Inject(ORDER_PRODUCT_REPOSITORY)
    private readonly orderProductModel: typeof OrderProduct,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderModel.create({
      status: createOrderDto.status,
      order_date: createOrderDto.order_date,
      total_amount: createOrderDto.total_amount,
      user_id: createOrderDto.user_id,
    });
    for (const product of createOrderDto.products) {
      const checkProduct = await this.productModel.findByPk(product.product_id);
      if (!checkProduct) {
        throw new NotFoundException(
          `product with id ${product.product_id} not found`,
        );
      }
      await this.orderProductModel.create({
        order_id: order.id,
        product_id: product.product_id,
        quantity: product.quantity,
      });
    }
    return this.orderModel.findByPk(order.id, { include: [Product] });
  }

  async findAll(): Promise<Order[]> {
    const allOrder = this.orderModel.findAll({
      include: [{ model: Product, through: { attributes: [] } }, Payment],
    });
    if (!allOrder) {
      throw new InternalServerErrorException('Error fetching order');
    }
    return allOrder;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findOne({
      where: { id },
      include: [Product],
    });
    if (!order) {
      throw new BadRequestException(`Order with ID ${id} not exists.`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const orderCheck = await this.orderModel.findOne({ where: { id } });
    if (!orderCheck) {
      throw new BadRequestException(
        `Order with ID ${id} not exists. so cann't be edited`,
      );
    }
    await this.orderModel.update(updateOrderDto, { where: { id } });
    return this.orderModel.findOne({ where: { id } });
  }

  async remove(id: number) {
    const orderCheck = await this.orderModel.findOne({ where: { id } });
    if (!orderCheck) {
      throw new BadRequestException(
        `Order with ID ${id} not exists. so cann't be deleted`,
      );
    }
    await this.orderModel.destroy({ where: { id } });
    return 'order is sucessfully deleted ';
  }
}
