import { Controller, Post, Body, Get, Param, Delete, Put, HttpException, HttpStatus, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { RegisterProductService } from '@/modules/product/application/services/register-product.service';
import { UpdateProductService } from '@/modules/product/application/services/update-product.service';
import { DeleteProductService } from '@/modules/product/application/services/delete-product.service';
import { ListProductsService } from '@/modules/product/application/services/list-products.service';
import { ProductAlreadyExistsError } from '@/modules/product/domain/exceptions/product-already-exists.error';
import { Category } from '../../category/domain/entities/category.entity';
import { CategoryNotFoundError } from '../../domain/exceptions/category-not-found.error';

@Controller('product')
export class ProductController {
    constructor(
        private readonly registerService: RegisterProductService,
        private readonly updateService: UpdateProductService,
        private readonly deleteService: DeleteProductService,
        private readonly listService: ListProductsService
    ) { }

    @Post('/')
    async register(@Body() body: { name: string, description: string, categoryId: number }) {
        try {
            await this.registerService.execute(body.name, body.description, body.categoryId);
            return { message: 'Product created successfully' };
        } catch (error) {
            console.error('Error registering product:', error);
            if (error instanceof ProductAlreadyExistsError) {
                throw new HttpException(error.message, HttpStatus.CONFLICT);
            }

            if (error instanceof CategoryNotFoundError) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }

            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/')
    async list() {
        const products = await this.listService.execute();
        return products;
    }

    @Put('/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { name: string, description: string, categoryId: number }
    ) {
        try {
            await this.updateService.execute(id, body.name, body.description, body.categoryId);
            return { message: 'Product updated successfully' };
        } catch (error) {
            if (error.message === 'Product not found') {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        try {
            await this.deleteService.execute(id);
            return { message: 'Product deleted successfully' };
        } catch (error) {
            if (error.message === 'Product not found') {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
