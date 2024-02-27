import express from 'express';
import MongoDB from "./frameworks/databases/MongoDB";
import ServiceLocator from "./ServiceLocator";
import cors from "./middlewares/cors";

const app = express();
const PORT = process.env.PORT || 8080;

import costRouter from "./routers/cost-router";
import categoryRouter  from './routers/category-router';
import balanceRouter from "./routers/balance-router";

app.use(cors);
app.use(express.json());

app.use('/cost', costRouter);
app.use('/category', categoryRouter);
app.use('/balance', balanceRouter);

const mongoUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/';
const defaultDB = new MongoDB('Default', mongoUrl);

async function start() {
    try {
        await defaultDB.connect();
        ServiceLocator.set('Default', defaultDB);

        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start();