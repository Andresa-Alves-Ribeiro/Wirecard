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
exports.ClientController = void 0;
class ClientController {
    constructor(clientBusiness) {
        this.clientBusiness = clientBusiness;
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, cpf, password } = req.body;
            const input = {
                name,
                email,
                cpf,
                password
            };
            try {
                const data = yield this.clientBusiness.signUp(input);
                res.status(201).send({ data: data });
            }
            catch (error) {
                const { statusCode, message } = error;
                if (statusCode === 200) {
                    res.status(500).send(`Erro ao cadastrar uma nova conta!`);
                }
                else {
                    res.status(statusCode || 400).send({ message });
                }
            }
            ;
        });
        this.createCard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            try {
                const data = yield this.clientBusiness.createCard(token);
                res.status(201).send({ data: data });
            }
            catch (error) {
                const { statusCode, message } = error;
                if (statusCode === 200) {
                    res.status(500).send(`Erro ao criar cartão!`);
                }
                else {
                    res.status(statusCode || 400).send({ message });
                }
            }
            ;
        });
        this.seeInfoFromCards = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            try {
                const data = yield this.clientBusiness.seeAllCards(token);
                res.status(201).send({ data: data });
            }
            catch (error) {
                const { statusCode, message } = error;
                if (statusCode === 200) {
                    res.status(500).send(`Erro ao ver informações dos cartões!`);
                }
                else {
                    res.status(statusCode || 400).send({ message });
                }
            }
            ;
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const input = {
                email,
                password
            };
            try {
                const data = yield this.clientBusiness.login(input);
                res.status(201).send({ data: data });
            }
            catch (error) {
                const { statusCode, message } = error;
                if (statusCode === 200) {
                    res.status(500).send(`Erro ao fazer login!`);
                }
                else {
                    res.status(statusCode || 400).send({ message });
                }
            }
            ;
        });
    }
}
exports.ClientController = ClientController;
;
//# sourceMappingURL=ClientController.js.map