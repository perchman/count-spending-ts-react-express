import express from 'express';
import MongoDB from "./frameworks/databases/MongoDB";
import ServiceLocator from "./ServiceLocator";

const app = express();
const PORT = process.env.PORT || 5000;

import costRouter from "./routers/cost-router";
import categoryRouter  from './routers/category-router';
import balanceRouter from "./routers/balance-router";

app.use('/costs', costRouter);
app.use('/categories', categoryRouter);
app.use('/balance', balanceRouter);

const defaultDB = new MongoDB('Default');

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