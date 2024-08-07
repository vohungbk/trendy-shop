import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ProductsService } from './products.service';
import { CreateProductRequest } from './dto/create-product.request';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PRODUCT_IMAGES } from './product-image';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() data: CreateProductRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.productsService.createProduct(data, user.userId);
  }

  @Post(':productId/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: PRODUCT_IMAGES,
        filename: (req, file, callback) =>
          callback(
            null,
            `${req.params.productId}${extname(file.originalname)}`,
          ),
      }),
    }),
  )
  uploadProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    _file: Express.Multer.File,
  ) {
    console.log(_file);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllProduct(@Query('status') status: string) {
    return this.productsService.getAllProduct(status);
  }

  @Get(':productId')
  @UseGuards(JwtAuthGuard)
  async getProductDetail(@Param('productId') productId: string) {
    return await this.productsService.getProductDetail(+productId);
  }
}
