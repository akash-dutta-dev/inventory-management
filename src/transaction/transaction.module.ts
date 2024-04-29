import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Transaction } from "./transaction.entity";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { TransactionRepository } from "./transaction.repository";




@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction]),
        TypeOrmModule.forFeature([TransactionRepository])
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}