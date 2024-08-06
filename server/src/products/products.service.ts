import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRequest } from './dto/create-product.request';
import { PRODUCT_IMAGES } from './product-image';

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
    const products = await this.prismaService.products.findMany();

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
