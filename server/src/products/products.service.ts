import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRequest } from './dto/create-product.request';
import { PRODUCT_IMAGES } from './product-image';
import { Prisma } from '@prisma/client';
import { ProductsGateway } from './product.gateway';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productGateway: ProductsGateway,
  ) {}

  async createProduct(data: CreateProductRequest, userId: number) {
    const product = await this.prismaService.products.create({
      data: {
        ...data,
        userId,
      },
    });
    this.productGateway.handleProductUpdated();
    return product;
  }

  async getAllProduct(status: string) {
    const args: Prisma.ProductsFindManyArgs = {};

    if (status === 'available') {
      args.where = { sold: false };
    }

    const products = await this.prismaService.products.findMany(args);

    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageExist: await this.checkImage(product.id),
      })),
    );
  }

  async getProductDetail(productId: number) {
    try {
      return {
        ...(await this.prismaService.products.findUniqueOrThrow({
          where: { id: productId },
        })),
        imageExist: await this.checkImage(productId),
      };
    } catch (error) {
      throw new NotFoundException(`Product not found with ID ${productId}`);
    }
  }

  async update(productId: number, data: Prisma.ProductsUpdateInput) {
    await this.prismaService.products.update({
      where: { id: productId },
      data,
    });
    this.productGateway.handleProductUpdated();
  }

  private async checkImage(productId: number) {
    try {
      await fs.access(
        join(`${PRODUCT_IMAGES}/${productId}.jpg`),
        fs.constants.F_OK,
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
