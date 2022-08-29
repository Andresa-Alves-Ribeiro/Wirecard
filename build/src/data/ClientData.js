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
exports.ClientData = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const CustomError_1 = require("./../error/CustomError");
class ClientData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.tableNameClient = "Wirecard_Client";
        this.tableNameCard = "Wirecard_Card";
        this.tableNameCardManagement = "Wirecard_Card_Management";
        this.createClient = (client) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield ClientData.connection(this.tableNameClient)
                    .insert({
                    id: client.getId(),
                    name: client.getName(),
                    email: client.getEmail(),
                    cpf: client.getCPF(),
                    password: client.getPassword()
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage || error.message);
            }
        });
        this.createCard = (card) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield ClientData.connection(this.tableNameCard)
                    .insert({
                    card_holder_id: card.getCardHolderId(),
                    card_holder_name: card.getCardHolderName(),
                    number: card.getCard(),
                    expiration_date: card.getExpirationDate(),
                    cvv: card.getCVV()
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage || error.message);
            }
        });
        this.createCardManagement = (card) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield ClientData.connection(this.tableNameCardManagement)
                    .insert({
                    card_holder_id: card.getCardHolderId(),
                    card_holder_name: card.getCardHolderName(),
                    number: card.getCard(),
                    expiration_date: card.getExpirationDate(),
                    cvv: card.getCVV()
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage || error.message);
            }
        });
        this.seeCards = (card_holder_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cards = yield ClientData.connection(this.tableNameCardManagement)
                    .select()
                    .where({ card_holder_id });
                return cards;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage || error.message);
            }
        });
        this.getCard = (number) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [card] = yield ClientData.connection(this.tableNameCard)
                    .select()
                    .where({ number });
                return card;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
        this.getCardByHolderId = (card_holder_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [card] = yield ClientData.connection(this.tableNameCard)
                    .select()
                    .where({ card_holder_id });
                return card;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
        this.getAllClients = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield ClientData.connection(this.tableNameClient)
                    .select();
                return clients;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
        this.getClientById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield ClientData.connection(this.tableNameClient)
                    .select()
                    .where({ id });
                return client[0];
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
        this.getClientByCPF = (cpf) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield ClientData.connection(this.tableNameClient)
                    .select()
                    .where({ cpf });
                return client[0];
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage || error.message);
            }
        });
        this.getClientByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield ClientData.connection(this.tableNameClient)
                    .select()
                    .where({ email });
                return client[0];
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage);
            }
        });
    }
}
exports.ClientData = ClientData;
//# sourceMappingURL=ClientData.js.map