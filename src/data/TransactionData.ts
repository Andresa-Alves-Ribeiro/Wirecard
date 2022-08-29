import { Transaction, TYPE } from "../model/Transaction";
import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from './../error/CustomError';

export class TransactionData extends BaseDatabase{
    private tableNamePayment = "Wirecard_Payment";

    createTransaction =async (transaction:Transaction) => {
        try {
            if(transaction.getType()===TYPE.CREDITCARD) {
                await TransactionData.connection(this.tableNamePayment)
                .insert({
                    client_id: transaction.getClientId(),
                    amount: transaction.getAmount(),
                    type: transaction.getType(),
                    card: transaction.getCard()
                })
            } else {
                await TransactionData.connection(this.tableNamePayment)
                .insert({
                    client_id: transaction.getClientId(),
                    amount: transaction.getAmount(),
                    type: transaction.getType()
                })
            }            

        } catch (error:any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }

    getAllTransactionsFromUser =async (client_id:string) => {
        try {
            const transactions = await TransactionData.connection(this.tableNamePayment)
            .select()
            .where({client_id})
            return transactions;
        } catch (error:any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }
}