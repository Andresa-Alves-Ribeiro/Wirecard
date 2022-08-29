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
exports.PaymentBusiness = void 0;
const PaymentData_1 = require("../data/PaymentData");
const CustomError_1 = require("../error/CustomError");
const idGenerator_1 = require("../services/idGenerator");
class PaymentBusiness {
    constructor(idGenerator, PaymentData) {
        this.idGenerator = idGenerator;
        this.PaymentData = PaymentData;
        this.numberRandom = (length) => {
            return Math.floor(Math.random() * length);
        };
        this.boletoNumber = () => {
            const number = '0123456789';
            let random = '';
            for (let i = 0; i <= 47; i++) {
                const index = Math.floor(this.numberRandom(number.length - 1));
                random += number[index];
            }
            return random;
        };
    }
    paymentCard(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { client_id, buyer_name, buyer_email, buyer_cpf, payment_amount, payment_type, card_holder_name, card_number, card_expiration_date, card_cvv } = input;
                if (!client_id) {
                    throw new CustomError_1.CustomError(422, 'Invalid Client ID');
                }
                if (!buyer_name || !buyer_email || !buyer_cpf) {
                    throw new CustomError_1.CustomError(422, 'Invalid Buyer');
                }
                if (!payment_amount || !payment_type) {
                    throw new CustomError_1.CustomError(422, 'Invalid Payment Data');
                }
                if (!card_holder_name || !card_number || !card_expiration_date || !card_cvv) {
                    throw new CustomError_1.CustomError(422, 'Invalid Credit Card');
                }
                const id = this.idGenerator.generateId();
                const payment = {
                    id,
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
                yield this.PaymentData.insertPaymentCard(payment);
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
    }
    paymentBoleto(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { client_id, buyer_name, buyer_email, buyer_cpf, payment_amount, payment_type } = input;
                if (!client_id) {
                    throw new CustomError_1.CustomError(422, 'Invalid Payment Data');
                }
                if (!buyer_name || !buyer_email || !buyer_cpf) {
                    throw new CustomError_1.CustomError(422, 'Invalid Payment Data');
                }
                if (!payment_amount || !payment_type) {
                    throw new CustomError_1.CustomError(422, 'Invalid Payment Data');
                }
                const id = this.idGenerator.generateId();
                const payment = {
                    id,
                    client_id,
                    buyer_name,
                    buyer_email,
                    buyer_cpf,
                    payment_amount,
                    payment_type,
                    boletoNumber: this.boletoNumber()
                };
                yield this.PaymentData.insertPaymentBoleto(payment);
                const response = { boletoNumber: payment.boletoNumber };
                return response;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
    }
    getPaymentCreditCard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new CustomError_1.CustomError(422, 'Missing Id');
                }
                const result = yield this.PaymentData.getPaymentCreditCard(id);
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
    }
    getPaymentBoleto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new CustomError_1.CustomError(422, 'Missing Id');
                }
                const result = yield this.PaymentData.getPaymentBoleto(id);
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
    }
}
exports.PaymentBusiness = PaymentBusiness;
exports.default = new PaymentBusiness(new idGenerator_1.IdGenerator(), new PaymentData_1.PaymentData());
//# sourceMappingURL=PaymentBusiness.js.map