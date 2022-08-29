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
exports.PaymentData = void 0;
const CustomError_1 = require("../error/CustomError");
const baseDatabase_1 = require("./baseDatabase");
class PaymentData extends baseDatabase_1.BaseDatabase {
    insertPaymentCard(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield baseDatabase_1.BaseDatabase.connection('wirecard_payment_creditcard')
                    .insert(input);
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
    }
    insertPaymentBoleto(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield baseDatabase_1.BaseDatabase.connection('wirecard_payment_boleto')
                    .insert(input);
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
    }
    getPaymentCreditCard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield baseDatabase_1.BaseDatabase.connection('wirecard_payment_creditcard')
                    .select('*')
                    .where({ id });
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
    }
    getPaymentBoleto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield baseDatabase_1.BaseDatabase.connection('wirecard_payment_boleto')
                    .select('*')
                    .where({ id });
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
    }
}
exports.PaymentData = PaymentData;
//# sourceMappingURL=PaymentData.js.map