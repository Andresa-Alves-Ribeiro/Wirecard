import { app } from "../src/app";
import { ClientBusiness } from './business/ClientBusiness';
import { ClientData } from "./data/ClientData";
import { IdGenerator } from "./services/IdGenerator";
import { TokenGenerator } from "./services/TokenGenerator";
import { HashManager } from "./services/HashManager";
import { ClientController } from './controller/ClientController';
import { TransactionBusiness } from './business/TransactionBusiness';
import { TransactionData } from "./data/TransactionData";
import { TransactionController } from './controller/TransactionController';


const clientBusiness = new ClientBusiness(
    new ClientData(),
    new IdGenerator(),
    new TokenGenerator(),
    new HashManager()
);

const clientController = new ClientController(
    clientBusiness
);

app.post("/user/signup", clientController.signUp);
app.post("/user/login", clientController.login);
app.post("/user/card", clientController.createCard);
app.get("/user/card", clientController.infoCards);


const transactionBusiness = new TransactionBusiness(
    new TransactionData(),
    new TokenGenerator(),
    new HashManager(),
    new ClientData()
);

const transactionController = new TransactionController(
    transactionBusiness
);

app.post("/payment", transactionController.createPayment);
app.get("/payment", transactionController.getPaymentsFromUser);