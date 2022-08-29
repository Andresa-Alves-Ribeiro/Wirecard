"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYMENTTYPE = exports.creditCard = void 0;
class creditCard {
    constructor(id, client_id, buyer_name, buyer_email, buyer_cpf, payment_amount, payment_type, payment_status, card_holder_name, card_number, card_expiration_date, card_cvv) {
        this.id = id;
        this.client_id = client_id;
        this.buyer_name = buyer_name;
        this.buyer_email = buyer_email;
        this.buyer_cpf = buyer_cpf;
        this.payment_amount = payment_amount;
        this.payment_type = payment_type;
        this.payment_status = payment_status;
        this.card_holder_name = card_holder_name;
        this.card_number = card_number;
        this.card_expiration_date = card_expiration_date;
        this.card_cvv = card_cvv;
    }
    getId() {
        return this.id;
    }
    getClientId() {
        return this.client_id;
    }
    getBuyerName() {
        return this.buyer_name;
    }
    getBuyerEmail() {
        return this.buyer_email;
    }
    getBuyerCpf() {
        return this.buyer_cpf;
    }
    getPaymentAmount() {
        return this.payment_amount;
    }
    getPaymentType() {
        return this.payment_type;
    }
    getPaymentStatus() {
        return this.payment_status;
    }
    getCardHolderName() {
        return this.card_holder_name;
    }
    getCardNumber() {
        return this.card_number;
    }
    getCardExpirationDate() {
        return this.card_expiration_date;
    }
    getCardCvv() {
        return this.card_cvv;
    }
}
exports.creditCard = creditCard;
var PAYMENTTYPE;
(function (PAYMENTTYPE) {
    PAYMENTTYPE["BOLETO"] = "BOLETO";
    PAYMENTTYPE["CREDITCARD"] = "CREDITCARD";
})(PAYMENTTYPE = exports.PAYMENTTYPE || (exports.PAYMENTTYPE = {}));
//# sourceMappingURL=creditCard.js.map