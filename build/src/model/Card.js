"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    constructor(card_holder_id, card_holder_name, card, expiration_date, cvv) {
        this.card_holder_id = card_holder_id;
        this.card_holder_name = card_holder_name;
        this.card = card;
        this.expiration_date = expiration_date;
        this.cvv = cvv;
        this.getCardHolderId = () => {
            return this.card_holder_id;
        };
        this.getCardHolderName = () => {
            return this.card_holder_name;
        };
        this.getCard = () => {
            return this.card;
        };
        this.getExpirationDate = () => {
            return this.expiration_date;
        };
        this.getCVV = () => {
            return this.cvv;
        };
    }
}
exports.Card = Card;
//# sourceMappingURL=Card.js.map