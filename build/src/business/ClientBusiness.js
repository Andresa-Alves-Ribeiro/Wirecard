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
exports.ClientBusiness = void 0;
const CustomError_1 = require("./../Error/CustomError");
const Client_1 = require("../model/Client");
const Card_1 = require("../Model/Card");
class ClientBusiness {
    constructor(clientData, idGenerator, tokenGenerator, hashManager) {
        this.clientData = clientData;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.hashManager = hashManager;
        this.signUp = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, cpf, password } = input;
                if (!name || !email || !cpf || !password) {
                    throw new CustomError_1.CustomError(422, "Nome, email e o cpf precisam ser informados no body!");
                }
                if (password.length <= 10) {
                    throw new CustomError_1.CustomError(401, "Password precisa ter mais que 10 caracteres.");
                }
                if (cpf.length !== 11) {
                    throw new CustomError_1.CustomError(401, "Por favor, informe apenas os números do CPF.");
                }
                const verifyEmail = yield this.clientData.getClientByEmail(email);
                const verifyCPF = yield this.clientData.getClientByCPF(cpf);
                if (verifyEmail || verifyCPF) {
                    throw new CustomError_1.CustomError(401, "Esse CPF ou E-mail já está registrado no nosso sistema!");
                }
                const id = this.idGenerator.generate();
                const hashPassword = yield this.hashManager.hash(password);
                const client = new Client_1.Client(id, name, email, cpf, hashPassword);
                yield this.clientData.createClient(client);
                const token = this.tokenGenerator.generate({ id, name });
                return token;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
        this.createCard = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(422, "O token precisa ser passado como Authorization no headers");
                }
                ;
                const client = this.tokenGenerator.verify(token);
                if (!client) {
                    throw new CustomError_1.CustomError(404, `Cliente não encontrado!`);
                }
                ;
                const id = client.id;
                const clientName = yield this.clientData.getClientById(client.id);
                const name = clientName.name;
                const generator = require('creditcard-generator');
                const [card] = yield generator.GenCC();
                const today = new Date();
                const month = today.getMonth() + 1;
                const year = today.getFullYear() + 10;
                const expiration_date = `${month}/${year}`;
                const cvv = Math.floor(Math.random() * (999 - 100 + 1) + 100).toString();
                const hashCVV = yield this.hashManager.hash(cvv);
                const newCard = new Card_1.Card(id, name, card, expiration_date, hashCVV);
                yield this.clientData.createCard(newCard);
                const generateToken = this.tokenGenerator.generate({ id: client.id, name: client.name, card: card, expiration_date: expiration_date, cvv: hashCVV });
                const infoCard = new Card_1.Card(id, name, card, expiration_date, cvv);
                yield this.clientData.createCardManagement(infoCard);
                const data = {
                    generateToken,
                    infoCard
                };
                return data;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
        this.seeAllCards = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(422, "O token precisa ser passado como Authorization no headers");
                }
                ;
                const client = this.tokenGenerator.verify(token);
                if (!client) {
                    throw new CustomError_1.CustomError(404, `Cliente não encontrado!`);
                }
                ;
                const id = client.id;
                const cards = yield this.clientData.seeCards(id);
                return cards;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = input;
                if (!email || !password) {
                    throw new CustomError_1.CustomError(401, `Email e password precisam ser informados no body para o login!`);
                }
                ;
                const client = yield this.clientData.getClientByEmail(email);
                if (!client) {
                    throw new CustomError_1.CustomError(404, `Usuário não encontrado!`);
                }
                const compare = yield this.hashManager.compareHash(password, client.password);
                if (!compare) {
                    throw new CustomError_1.CustomError(404, `Credenciais inválidas`);
                }
                const token = this.tokenGenerator.generate({ id: client.id });
                const card = yield this.clientData.getCardByHolderId(client.id);
                if (!card) {
                    return token;
                }
                else {
                    const data = {
                        token,
                        card
                    };
                    return data;
                }
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
    }
}
exports.ClientBusiness = ClientBusiness;
//# sourceMappingURL=ClientBusiness.js.map