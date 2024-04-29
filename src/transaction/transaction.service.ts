import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async createTransaction(productId: number, quantity: number, type: 'add' | 'deduct'): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.product = productId ;
    transaction.transactionType = type;
    transaction.quantity = quantity;
    return await this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async getLastTransactions(n: number): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      order: { timestamp: 'DESC' },
      take: n,
    });
  }
}
