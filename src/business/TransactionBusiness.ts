import { CustomError } from '../error/CustomError';
import { InputCreateTransaction, Transaction, TYPE } from '../model/Transaction';
import { TransactionData } from '../data/TransactionData';
import { TokenGenerator } from './../services/TokenGenerator';
import { HashManager } from './../services/HashManager';
import { ClientData } from './../data/ClientData';


export class TransactionBusiness {
    constructor(
        private transactionData: TransactionData,
        private tokenGenerator: TokenGenerator,
        private hashManager: HashManager,
        private clientData: ClientData
    ) {}

    createPayment = async (input: InputCreateTransaction) => {
        try {
            const { token, amount, type } = input;
            if (!token) {
                throw new CustomError(422, "O token precisa ser passado como Authorization no headers");
            };

            if (!amount || !type) {
                throw new CustomError(422, "Amount e type precisam ser passados no body");
            };

            if (isNaN(amount) || !Number.isInteger(amount) || amount <= 0) {
                throw new CustomError(401, "Amount precisa ser um número inteiro maior que 0");
            };

            if (type !== TYPE.CREDITCARD && type !== TYPE.BOLETO) {
                throw new CustomError(400, `Type precisa ser informado como ${TYPE.BOLETO} ou ${TYPE.CREDITCARD}`);
            };

            const client = this.tokenGenerator.verify(token);
            
            if (!client) {
                throw new CustomError(404, `Cliente não encontrado!`);
            };

            if (type === TYPE.BOLETO) {
                const transaction = new Transaction(
                    client.id,
                    amount,
                    type
                )

                await this.transactionData.createTransaction(transaction);

                return transaction;
            } else {
                const { name, card, expiration_date, cvv } = input;

                if (!name || !card || !expiration_date || !cvv) {
                    throw new CustomError(401, `Para pagamentos do type ${TYPE.CREDITCARD}, você precisa informar o name, card, expiration_date e cvv como constam no cartão!`);
                };

                const clientName = await this.clientData.getClientById(client.id);

                const compareName = clientName.name;

                if (name !== compareName || card !== client.card || expiration_date !== client.expiration_date) {
                    throw new CustomError(422, `Dados do cartão inválidos! Pagamento não autorizado!`);
                };

                const verifyCVV = this.hashManager.compareHash(cvv, client.cvv)

                console.log(verifyCVV)

                if (!verifyCVV) {
                    throw new CustomError(422, `CVV inválido! Pagamento não autorizado!`);
                }

                const transaction = new Transaction(
                    client.id,
                    amount,
                    type,
                    card
                );

                await this.transactionData.createTransaction(transaction);

                return transaction;
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    getPaymentsFromUser = async (token: string) => {
        try {

            if (!token) {
                throw new CustomError(422, "O token precisa ser passado como Authorization no headers");
            };

            const client = this.tokenGenerator.verify(token);

            if (!client) {
                throw new CustomError(404, `Cliente não encontrado!`);
            };

            const transactions = await this.transactionData.getAllTransactionsFromUser(client.id);

            return transactions;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
}