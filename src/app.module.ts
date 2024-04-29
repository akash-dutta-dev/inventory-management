import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { Transaction } from './transaction/transaction.entity';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transaction/transaction.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : "postgres",
      host : "ep-shiny-cloud-a52nxirb.us-east-2.aws.neon.tech",
      port : 5432,
      username : "inventory-app_owner",
      password : "BrAZT6dnkPI9",
      database : "inventory-app",
      logging : true,
      synchronize : true,
      ssl: true,
      entities : [
          Product, Transaction
      ]
    }),
    ProductModule,
    TransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
