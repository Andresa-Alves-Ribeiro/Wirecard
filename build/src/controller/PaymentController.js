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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const PaymentBusiness_1 = __importDefault(require("../business/PaymentBusiness"));
class PaymentController {
    registerPaymentCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { client_id, buyer_name, buyer_email, buyer_cpf, payment_amount, payment_type, card_holder_name, card_number, card_expiration_date, card_cvv } = req.body;
                const input = {
                    client_id,
                    buyer_name,
                    buyer_email,
                    buyer_cpf,
                    payment_amount,
                    payment_type,
                    card_holder_name,
                    card_number,
                    card_expiration_date,
                    card_cvv
                };
                PaymentBusiness_1.default.paymentCard(input);
                res.status(200).send('Payment successfully registered');
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
        });
    }
    registerPaymentBoleto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { client_id, buyer_name, buyer_email, buyer_cpf, payment_amount, payment_type } = req.body;
                const input = {
                    client_id,
                    buyer_name,
                    buyer_email,
                    buyer_cpf,
                    payment_amount,
                    payment_type
                };
                const result = yield PaymentBusiness_1.default.paymentBoleto(input);
                res.status(200).send(result);
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
        });
    }
    getPaymentCreditCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield PaymentBusiness_1.default.getPaymentCreditCard(id);
                res.status(200).send(result);
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
        });
    }
    getPaymentBoleto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield PaymentBusiness_1.default.getPaymentBoleto(id);
                res.status(200).send(result);
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
        });
    }
}
exports.PaymentController = PaymentController;
exports.default = new PaymentController();
//# sourceMappingURL=PaymentController.js.map