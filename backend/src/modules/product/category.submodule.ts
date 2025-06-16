import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { RegisterCategoryService } from '@/modules/product/application/services/category/register-category.service';
import { CategoryController } from '@/modules/product/application/controllers/category.controller';
import { CategoryRepository } from '@/modules/product/infrastructure/category/category.repository';
import { CategoryRepositoryInterface } from '@/modules/product/domain/repositories/category.repository';
import { UpdateCategoryService } from '@/modules/product/application/services/category/update-category.service';
import { ListCategoriesService } from '@/modules/product/application/services/category/list-categories.service';
import { DeleteCategoryService } from '@/modules/product/application/services/category/delete-category.service';

@Module({
  controllers: [CategoryController],
  providers: [
    RegisterCategoryService,
    UpdateCategoryService,
    ListCategoriesService,
    DeleteCategoryService,
    PrismaService,
    {
      provide: CategoryRepositoryInterface,
      useClass: CategoryRepository,
    },
  ],
})
export class CategoryModule {}
