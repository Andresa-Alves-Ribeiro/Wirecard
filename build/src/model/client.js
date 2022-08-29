"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    constructor(id, name, email, cpf, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.password = password;
        this.getId = () => {
            return this.id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getEmail = () => {
            return this.email;
        };
        this.getCPF = () => {
            return this.cpf;
        };
        this.getPassword = () => {
            return this.password;
        };
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map