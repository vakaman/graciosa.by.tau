import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProductVariantService } from '@/modules/product/application/services/variant/create-product-variant.service';
import { CreateProductVariantDto } from '@/modules/product/application/dtos/create-product-variant.dto';

@Controller('product/:productId/variant')
export class ProductVariantController {
  constructor(
    private readonly createProductVariantService: CreateProductVariantService,
  ) {}

  @Post()
  async create(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: CreateProductVariantDto,
  ) {
    await this.createProductVariantService.execute(productId, dto);
    return { message: 'Variant created successfully' };
  }
}
