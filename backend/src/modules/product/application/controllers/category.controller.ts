import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { RegisterCategoryService } from '@/modules/product/application/services/category/register-category.service';
import { UpdateCategoryService } from '@/modules/product/application/services/category/update-category.service';
import { DeleteCategoryService } from '@/modules/product/application/services/category/delete-category.service';
import { ListCategoriesService } from '@/modules/product/application/services/category/list-categories.service';

@Controller('product/category')
export class CategoryController {
  constructor(
    private readonly registerService: RegisterCategoryService,
    private readonly updateService: UpdateCategoryService,
    private readonly deleteService: DeleteCategoryService,
    private readonly listService: ListCategoriesService,
  ) {}

  @Post('/')
  async register(@Body() body: { name: string }) {
    try {
      await this.registerService.execute(body.name);
      return { message: 'Category created successfully' };
    } catch (error: unknown) {
      if (this.isError(error) && error.message === 'Category already exists') {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/')
  async list() {
    const categories = await this.listService.execute();
    return categories;
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string },
  ) {
    try {
      await this.updateService.execute(id, body.name);
      return { message: 'Category updated successfully' };
    } catch (error: unknown) {
      if (this.isError(error) && error.message === 'Category not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      console.log(error);
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.deleteService.execute(id);
      return { message: 'Category deleted successfully' };
    } catch (error: unknown) {
      if (this.isError(error) && error.message === 'Category not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      console.log(error);
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private isError(error: unknown): error is Error {
    return typeof error === 'object' && error !== null && 'message' in error;
  }
}
