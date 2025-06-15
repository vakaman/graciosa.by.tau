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
  Query,
} from '@nestjs/common';
import { RegisterProductService } from '@/modules/product/application/services/register-product.service';
import { UpdateProductService } from '@/modules/product/application/services/update-product.service';
import { DeleteProductService } from '@/modules/product/application/services/delete-product.service';
import { ListProductsService } from '@/modules/product/application/services/list-products.service';
import { ProductAlreadyExistsError } from '@/modules/product/domain/exceptions/product-already-exists.error';
import { CategoryNotFoundError } from '@/modules/product/domain/exceptions/category-not-found.error';
import { ProductFilters } from '@/modules/product/application/dtos/product-filters.dto';
import { ListPaginatedProductsService } from '@/modules/product/application/services/list-paginated-products.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly registerService: RegisterProductService,
    private readonly updateService: UpdateProductService,
    private readonly deleteService: DeleteProductService,
    private readonly listService: ListProductsService,
    private readonly listPaginatedService: ListPaginatedProductsService,
  ) {}

  @Post('/')
  async register(
    @Body() body: { name: string; description: string; categoryId: number },
  ) {
    try {
      await this.registerService.execute(
        body.name,
        body.description,
        body.categoryId,
      );
      return { message: 'Product created successfully' };
    } catch (error: unknown) {
      console.error('Error registering product:', error);

      if (error instanceof ProductAlreadyExistsError) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }

      if (error instanceof CategoryNotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/')
  async list() {
    const products = await this.listService.execute();
    return products;
  }

  @Get('/paginated')
  async listPaginated(
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('orderBy') orderBy = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'desc',
    @Query('name') name?: string,
    @Query('exactName') exactName = '0',
    @Query('description') description?: string,
    @Query('exactDescription') exactDescription = '0',
    @Query('categoryId') categoryId?: string,
  ) {
    const filters: ProductFilters = {
      name,
      exactName: exactName === '1',
      description,
      exactDescription: exactDescription === '1',
      categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
    };

    const result = await this.listPaginatedService.execute({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      orderBy,
      order,
      filters,
    });

    return {
      data: result.data,
      total: result.total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string; description: string; categoryId: number },
  ) {
    try {
      await this.updateService.execute(
        id,
        body.name,
        body.description,
        body.categoryId,
      );
      return { message: 'Product updated successfully' };
    } catch (error: unknown) {
      if (this.isError(error) && error.message === 'Product not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
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
      return { message: 'Product deleted successfully' };
    } catch (error: unknown) {
      if (this.isError(error) && error.message === 'Product not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
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
