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
const PaymentBusiness_1 = __importDefault(require("../src/business/PaymentBusiness"));
const inputMock = {
    client_id: 'client',
    buyer_name: 'Andresa',
    buyer_email: 'andresa@gmail.com',
    buyer_cpf: '42165896212',
    payment_amount: 1000,
    payment_type: 'CREDITCARD',
    card_holder_name: 'Andresa Alves Ribeiro',
    card_number: '7531598524560001',
    card_expiration_date: '11/25',
    card_cvv: '345'
};
describe('test class Payment Business', () => {
    describe('test payment card method', () => {
        test('test invalid client ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.client_id = '';
            try {
                yield PaymentBusiness_1.default.paymentCard(input);
            }
            catch (error) {
                input.client_id = 'client';
                expect(error.message).toEqual('Invalid Client ID');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid buyer name', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.buyer_name = '';
            try {
                yield PaymentBusiness_1.default.paymentCard(input);
            }
            catch (error) {
                input.buyer_name = 'Andresa';
                expect(error.message).toEqual('Invalid Buyer');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid buyer email', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.buyer_email = '';
            try {
                yield PaymentBusiness_1.default.paymentCard(input);
            }
            catch (error) {
                input.buyer_email = 'andresa@gmail.com';
                expect(error.message).toEqual('Invalid Buyer');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid buyer CPF', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.buyer_cpf = '';
            try {
                yield PaymentBusiness_1.default.paymentCard(input);
            }
            catch (error) {
                input.buyer_cpf = '42165896212';
                expect(error.message).toEqual('Invalid Buyer');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid payment amount', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.payment_amount = undefined;
            try {
                yield PaymentBusiness_1.default.paymentCard(input);
            }
            catch (error) {
                input.payment_amount = 1000;
                expect(error.message).toEqual('Invalid Payment Data');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid payment type', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.payment_type = '';
            try {
                yield PaymentBusiness_1.default.paymentCard(input);
            }
            catch (error) {
                input.payment_type = 'CREDITCARD';
                expect(error.message).toEqual('Invalid Payment Data');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid credit card', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.card_holder_name = '';
            try {
                yield PaymentBusiness_1.default.paymentCard(input);
            }
            catch (error) {
                input.card_holder_name = 'Andresa Alves Ribeiro';
                expect(error.message).toEqual('Invalid Credit Card');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid credit card', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.card_number = '';
            try {
                yield PaymentBusiness_1.default.paymentCard(input);
            }
            catch (error) {
                input.card_number = '7531598524560001';
                expect(error.message).toEqual('Invalid Credit Card');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid credit card', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.card_expiration_date = '';
            try {
                yield PaymentBusiness_1.default.paymentCard(input);
            }
            catch (error) {
                input.card_expiration_date = '11/25';
                expect(error.message).toEqual('Invalid Credit Card');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid credit card', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.card_cvv = '';
            try {
                yield PaymentBusiness_1.default.paymentCard(input);
            }
            catch (error) {
                input.card_cvv = '345';
                expect(error.message).toEqual('Invalid Credit Card');
            }
            finally {
                expect.assertions(1);
            }
        }));
    });
});
describe('test class Payment Boleto', () => {
    describe('test payment boleto method', () => {
        test('test invalid client ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.client_id = '';
            try {
                yield PaymentBusiness_1.default.paymentBoleto(input);
            }
            catch (error) {
                input.client_id = 'client';
                expect(error.message).toEqual('Invalid Client ID');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid buyer name', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.buyer_name = '';
            try {
                yield PaymentBusiness_1.default.paymentBoleto(input);
            }
            catch (error) {
                input.buyer_name = 'Andresa';
                expect(error.message).toEqual('Invalid Buyer');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid buyer email', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.buyer_email = '';
            try {
                yield PaymentBusiness_1.default.paymentBoleto(input);
            }
            catch (error) {
                input.buyer_email = 'andresa@gmail.com';
                expect(error.message).toEqual('Invalid Buyer');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid buyer CPF', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.buyer_cpf = '';
            try {
                yield PaymentBusiness_1.default.paymentBoleto(input);
            }
            catch (error) {
                input.buyer_cpf = '42165896212';
                expect(error.message).toEqual('Invalid Buyer');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid payment amount', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.payment_amount = '';
            try {
                yield PaymentBusiness_1.default.paymentBoleto(input);
            }
            catch (error) {
                input.payment_amount = 1000;
                expect(error.message).toEqual('Invalid Payment Data');
            }
            finally {
                expect.assertions(1);
            }
        }));
        test('test invalid payment type', () => __awaiter(void 0, void 0, void 0, function* () {
            const input = inputMock;
            input.payment_type = '';
            try {
                yield PaymentBusiness_1.default.paymentBoleto(input);
            }
            catch (error) {
                input.payment_type = 'BOLETO';
                expect(error.message).toEqual('Invalid Payment Data');
            }
            finally {
                expect.assertions(1);
            }
        }));
    });
});
//# sourceMappingURL=Payment.test.js.map