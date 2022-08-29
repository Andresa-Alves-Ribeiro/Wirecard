"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const PaymentController_1 = __importDefault(require("../controller/PaymentController"));
exports.paymentRouter = (0, express_1.Router)();
exports.paymentRouter.post('/paymentCreditCard', PaymentController_1.default.registerPaymentCard);
exports.paymentRouter.post('/paymentBoleto', PaymentController_1.default.registerPaymentBoleto);
exports.paymentRouter.get('/getPaymentCreditCard/:id', PaymentController_1.default.getPaymentCreditCard);
exports.paymentRouter.get('/getPaymentBoleto/:id', PaymentController_1.default.getPaymentBoleto);
//# sourceMappingURL=paymentRouter.js.map