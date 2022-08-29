"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionBusiness = void 0;
const CustomError_1 = require("../Error/CustomError");
const Transaction_1 = require("../model/Transaction");
class TransactionBusiness {
    constructor(transactionData, tokenGenerator, hashManager, clientData) {
        this.transactionData = transactionData;
        this.tokenGenerator = tokenGenerator;
        this.hashManager = hashManager;
        this.clientData = clientData;
        this.createPayment = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, amount, type } = input;
                if (!token) {
                    throw new CustomError_1.CustomError(422, "O token precisa ser passado como Authorization no headers");
                }
                ;
                if (!amount || !type) {
                    throw new CustomError_1.CustomError(422, "Amount e type precisam ser passados no body");
                }
                ;
                if (isNaN(amount) || !Number.isInteger(amount) || amount <= 0) {
                    throw new CustomError_1.CustomError(401, "Amount precisa ser um número inteiro maior que 0");
                }
                ;
                if (type !== Transaction_1.TYPE.CREDITCARD && type !== Transaction_1.TYPE.BOLETO) {
                    throw new CustomError_1.CustomError(400, `Type precisa ser informado como ${Transaction_1.TYPE.BOLETO} ou ${Transaction_1.TYPE.CREDITCARD}`);
                }
                ;
                const client = this.tokenGenerator.verify(token);
                if (!client) {
                    throw new CustomError_1.CustomError(404, `Cliente não encontrado!`);
                }
                ;
                if (type === Transaction_1.TYPE.BOLETO) {
                    const transaction = new Transaction_1.Transaction(client.id, amount, type);
                    yield this.transactionData.createTransaction(transaction);
                    return transaction;
                }
                else {
                    const { name, card, expiration_date, cvv } = input;
                    if (!name || !card || !expiration_date || !cvv) {
                        throw new CustomError_1.CustomError(401, `Para pagamentos do type ${Transaction_1.TYPE.CREDITCARD}, você precisa informar o name, card, expiration_date e cvv como constam no cartão!`);
                    }
                    ;
                    const clientName = yield this.clientData.getClientById(client.id);
                    const compareName = clientName.name;
                    if (name !== compareName || card !== client.card || expiration_date !== client.expiration_date) {
                        throw new CustomError_1.CustomError(422, `Credenciais do cartão inválidas! Pagamento não autorizado!`);
                    }
                    ;
                    const verifyCVV = this.hashManager.compareHash(cvv, client.cvv);
                    console.log(verifyCVV);
                    if (!verifyCVV) {
                        throw new CustomError_1.CustomError(422, `Credenciais do cartão inválidas! Pagamento não autorizado!`);
                    }
                    const transaction = new Transaction_1.Transaction(client.id, amount, type, card);
                    yield this.transactionData.createTransaction(transaction);
                    return transaction;
                }
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
        this.getPaymentsFromUser = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(422, "O token precisa ser passado como Authorization no headers");
                }
                ;
                const client = this.tokenGenerator.verify(token);
                if (!client) {
                    throw new CustomError_1.CustomError(404, `Cliente não encontrado!`);
                }
                ;
                const transactions = yield this.transactionData.getAllTransactionsFromUser(client.id);
                return transactions;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
    }
}
exports.TransactionBusiness = TransactionBusiness;
//# sourceMappingURL=TransactionBusiness.js.map