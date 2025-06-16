import { Module } from '@nestjs/common';
import { ProductController } from './application/controllers/product.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { ProductRepositoryInterface } from './domain/repositories/product.repository';
import { ProductRepository } from './infrastructure/product/product.repository';
import { RegisterProductService } from './application/services/product/register-product.service';
import { UpdateProductService } from './application/services/product/update-product.service';
import { DeleteProductService } from './application/services/product/delete-product.service';
import { ListProductsService } from './application/services/product/list-products.service';
import { CategoryRepository } from './infrastructure/category/category.repository';
import { CategoryRepositoryInterface } from './domain/repositories/category.repository';
import { ListPaginatedProductsService } from './application/services/product/list-paginated-products.service';
import { ProductDetailsService } from './application/services/product/product-details.service';

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
    ListPaginatedProductsService,
    ProductDetailsService,
  ],
})
export class ProductModule {}
