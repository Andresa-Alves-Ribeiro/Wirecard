import { Request, Response } from 'express';
import { ClientBusiness } from './../business/ClientBusiness';
import { CustomError } from './../error/CustomError';

export class ClientController {
    constructor(
        private clientBusiness:ClientBusiness
    ){}

    signUp = async (req:Request, res:Response) => {
        const {name, email, cpf, password} = req.body;
        const input = {
            name,
            email,
            cpf,
            password
        }
        try {
            const data = await this.clientBusiness.signUp(input);
            res.status(201).send({data:data});
        } catch (error:any) {
            const {statusCode, message} = error;
            if (statusCode === 200) {
                res.status(500).send(`Erro ao cadastrar uma nova conta!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        };
    }; 

    createCard = async (req:Request, res:Response) => {
        const token = req.headers.authorization as string;
        try {
            const data = await this.clientBusiness.createCard(token);
            res.status(201).send({data:data});
        } catch (error:any) {
            const {statusCode, message} = error;
            if (statusCode === 200) {
                res.status(500).send(`Erro ao criar cartão!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        };
    }; 

    infoCards = async (req:Request, res:Response) => {
        const token = req.headers.authorization as string;
        try {
            const data = await this.clientBusiness.allCards(token);
            res.status(201).send({data:data});
        } catch (error:any) {
            const {statusCode, message} = error;
            if (statusCode === 200) {
                res.status(500).send(`Erro ao obter informações dos cartões!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        };
    }; 

    login = async (req:Request, res:Response) => {
        const {email, password} = req.body;
        const input = {
            email,
            password
        }
        try {
            const data = await this.clientBusiness.login(input);
            res.status(201).send({data:data});
        } catch (error:any) {
            const {statusCode, message} = error;
            if (statusCode === 200) {
                res.status(500).send(`Erro ao fazer login!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        };
    }; 
};