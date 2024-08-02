import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRequest } from './dto/create-product.request';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(data: CreateProductRequest, userId: number) {
    return this.prismaService.products.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getAllProduct() {
    return await this.prismaService.products.findMany();
  }
}
