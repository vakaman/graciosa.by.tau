import { Module } from '@nestjs/common';
import { AccountModule } from '@/modules/account/account.module';
import { ProductModule } from '@/modules/product/product.module';

@Module({
  imports: [
    AccountModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
