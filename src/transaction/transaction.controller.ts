import { Controller, Get, Param } from "@nestjs/common";
import { Transaction } from "./transaction.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Controller('transaction')
export class TransactionController{
    constructor (
        @InjectRepository(Transaction)
        private readonly transactionService: TransactionController
    ){}

    @Get()
    async findAll(): Promise<Transaction[]> {
        return await this.transactionService.findAll();
    }

    @Get('last/:n')
    async getLastTransactions(@Param('n') n: number): Promise<Transaction[]> {
        return await this.transactionService.getLastTransactions(n);
    }
}