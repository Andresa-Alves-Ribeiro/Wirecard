export enum TYPE {
    BOLETO = "BOLETO",
    CREDITCARD = "CREDITCARD"
};

export class Transaction {
    constructor(
        private client_id:string,
        private amount:number,
        private type:TYPE,
        private card?:string
    ){}

    public getClientId = ():string => {
        return this.client_id;
    };

    public getAmount = ():number => {
        return this.amount;
    };

    public getType = ():TYPE => {
        return this.type;
    };
    
    public getCard = ():string|undefined => {
        return this.card;
    };
}

export type InputCreateTransaction = {
    token:string,
    amount:number,
    type:TYPE,
    name?:string,
    card?:string,
    expiration_date?:string,
    cvv?:string
}