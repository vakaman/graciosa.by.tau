import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { RegisterCategoryService } from '@/modules/product/category/application/services/register-category.service';
import { CategoryController } from '@/modules/product/category/application/controllers/category.controller';
import { CategoryRepository } from '@/modules/product/category/infrastructure/category.repository'
import { CategoryRepositoryInterface } from '@/modules/product/category/domain/repositories/category.repository';
import { UpdateCategoryService } from './application/services/update-category.service';
import { ListCategoriesService } from './application/services/list-categories.service';
import { DeleteCategoryService } from './application/services/delete-category.service';

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
      useClass: CategoryRepository
    }
  ]
})
export class CategoryModule {}
