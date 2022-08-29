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
exports.TransactionData = void 0;
const Transaction_1 = require("../model/Transaction");
const BaseDatabase_1 = require("./BaseDatabase");
const CustomError_1 = require("./../error/CustomError");
class TransactionData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.tableNamePayment = "Wirecard_Payment";
        this.createTransaction = (transaction) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (transaction.getType() === Transaction_1.TYPE.CREDITCARD) {
                    yield TransactionData.connection(this.tableNamePayment)
                        .insert({
                        client_id: transaction.getClientId(),
                        amount: transaction.getAmount(),
                        type: transaction.getType(),
                        card: transaction.getCard()
                    });
                }
                else {
                    yield TransactionData.connection(this.tableNamePayment)
                        .insert({
                        client_id: transaction.getClientId(),
                        amount: transaction.getAmount(),
                        type: transaction.getType()
                    });
                }
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
        this.getAllTransactionsFromUser = (client_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield TransactionData.connection(this.tableNamePayment)
                    .select()
                    .where({ client_id });
                return transactions;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
    }
}
exports.TransactionData = TransactionData;
//# sourceMappingURL=TransactionData.js.map