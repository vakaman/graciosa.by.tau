import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProductVariantService } from '@/modules/product/application/services/variant/create-product-variant.service';
import { ProductRepositoryInterface } from '@/modules/product/domain/repositories/product.repository';
import { ProductRepository } from '@/modules/product/infrastructure/product/product.repository';
import { ProductVariantController } from '@/modules/product/application/controllers/variant.controller';

@Module({
  controllers: [ProductVariantController],
  providers: [
    PrismaService,
    CreateProductVariantService,
    {
      provide: ProductRepositoryInterface,
      useClass: ProductRepository,
    },
  ],
})
export class ProductVariantModule {}
