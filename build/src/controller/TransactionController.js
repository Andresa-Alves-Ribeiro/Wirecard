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
exports.TransactionController = void 0;
class TransactionController {
    constructor(transactionBusiness) {
        this.transactionBusiness = transactionBusiness;
        this.createPayment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const { amount, type, name, card, expiration_date, cvv } = req.body;
            const input = {
                token,
                amount,
                type,
                name,
                card,
                expiration_date,
                cvv
            };
            try {
                const data = yield this.transactionBusiness.createPayment(input);
                res.status(201).send({ Payment: data });
            }
            catch (error) {
                const { statusCode, message } = error;
                if (statusCode === 200) {
                    res.status(500).send(`Erro ao cadastrar um pagamento!`);
                }
                else {
                    res.status(statusCode || 400).send({ message });
                }
            }
            ;
        });
        this.getPaymentsFromUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            try {
                const data = yield this.transactionBusiness.getPaymentsFromUser(token);
                res.status(200).send({ Payments: data });
            }
            catch (error) {
                const { statusCode, message } = error;
                if (statusCode === 200) {
                    res.status(500).send(`Erro ao selecionar os pagamentos!`);
                }
                else {
                    res.status(statusCode || 400).send({ message });
                }
            }
            ;
        });
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=TransactionController.js.map