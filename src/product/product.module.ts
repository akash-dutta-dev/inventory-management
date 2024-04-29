import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { TransactionModule } from 'src/transaction/transaction.module';



@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        TypeOrmModule.forFeature([ProductRepository]),
        TransactionModule
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}