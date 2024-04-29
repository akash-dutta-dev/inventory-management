import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { TransactionService } from 'src/transaction/transaction.service';
import { Transaction } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOneOrFail({ where: { id } });
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  @Transaction() 
  async update(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  @Transaction() 
  async deductInventory(
    productId: number,
    quantity: number,
  ): Promise<Product> {
    const product = await this.findOne(productId);
    if (product.currentQuantity < quantity) {
      throw new Error('Insufficient stock');
    }

    product.currentQuantity -= quantity;
    await this.transactionService.createTransaction(product.id, quantity, 'deduct');
    return await this.productRepository.save(product);
  }

  @Transaction() 
  async addInventory(productId: number, quantity: number): Promise<Product> {
    const product = await this.findOne(productId);
    const newQuantity = product.currentQuantity + Number(quantity);
    if (newQuantity > product.maximumQuantity) {
      throw new Error('Exceeding maximum inventory level');
    }

    product.currentQuantity = newQuantity;
    await this.transactionService.createTransaction(product.id, quantity, 'add');
    return await this.productRepository.save(product);
  }
}
