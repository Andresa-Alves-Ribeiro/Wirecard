export class Card {
    constructor(
        private card_holder_id:string,
        private card_holder_name:string,
        private card:string,
        private expiration_date:string,
        private cvv:string
    ){}

    public getCardHolderId = ():string => {
        return this.card_holder_id;
    };

    public getCardHolderName = ():string => {
        return this.card_holder_name;
    };

    public getCard = ():string => {
        return this.card;
    };

    public getExpirationDate = ():string => {
        return this.expiration_date;
    };
    
    public getCVV = ():string => {
        return this.cvv;
    };
}