import { Module } from '@nestjs/common';
import { ProductController } from './application/controllers/product.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { ProductRepositoryInterface } from './domain/repositories/product.repository';
import { ProductRepository } from './infrastructure/product.repository';
import { RegisterProductService } from './application/services/register-product.service';
import { UpdateProductService } from './application/services/update-product.service';
import { DeleteProductService } from './application/services/delete-product.service';
import { ListProductsService } from './application/services/list-products.service';
import { CategoryRepository } from './category/infrastructure/category.repository';
import { CategoryRepositoryInterface } from './category/domain/repositories/category.repository';

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    { provide: ProductRepositoryInterface, useClass: ProductRepository },
    { provide: CategoryRepositoryInterface, useClass: CategoryRepository },
    RegisterProductService,
    UpdateProductService,
    DeleteProductService,
    ListProductsService,
  ],
})
export class ProductModule {}
