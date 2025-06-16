import { Module } from '@nestjs/common';
import { AccountModule } from '@/modules/account/account.module';
import { ProductModule } from '@/modules/product/product.module';
import { CategoryModule } from '@/modules/product/category.submodule';
import { ProductVariantModule } from '@/modules/product/variant.submodule';

@Module({
  imports: [AccountModule, ProductModule, CategoryModule, ProductVariantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
