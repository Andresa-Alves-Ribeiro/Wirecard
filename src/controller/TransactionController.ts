import { TransactionBusiness } from './../business/TransactionBusiness';
import { Request, Response } from 'express';
import { CustomError } from './../error/CustomError';

export class TransactionController {
    constructor(
        private transactionBusiness:TransactionBusiness
    ){}

    createPayment =async (req:Request, res:Response) => {
        const token = req.headers.authorization as string;
        const {amount, type, name, card, expiration_date, cvv} = req.body;
        const input = {
            token,
            amount,
            type,
            name,
            card,
            expiration_date,
            cvv
        }
        try {
            const data = await this.transactionBusiness.createPayment(input);
            res.status(201).send({Payment: data});
        } catch (error:any) {
            const {statusCode, message} = error;
            if (statusCode === 200) {
                res.status(500).send(`Erro ao cadastrar um pagamento!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        };
    };

    getPaymentsFromUser =async (req:Request, res:Response) => {
        const token = req.headers.authorization as string;

        try {
            const data = await this.transactionBusiness.getPaymentsFromUser(token);
            res.status(200).send({Payments:data});
        } catch (error:any) {
            const {statusCode, message} = error;
            if (statusCode === 200) {
                res.status(500).send(`Erro ao selecionar os pagamentos!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        };
    }
}