"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TYPE = void 0;
var TYPE;
(function (TYPE) {
    TYPE["BOLETO"] = "BOLETO";
    TYPE["CREDITCARD"] = "CREDIT CARD";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
;
class Transaction {
    constructor(client_id, amount, type, card) {
        this.client_id = client_id;
        this.amount = amount;
        this.type = type;
        this.card = card;
        this.getClientId = () => {
            return this.client_id;
        };
        this.getAmount = () => {
            return this.amount;
        };
        this.getType = () => {
            return this.type;
        };
        this.getCard = () => {
            return this.card;
        };
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map