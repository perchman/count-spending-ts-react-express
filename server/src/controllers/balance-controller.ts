import { Request, Response } from 'express';
import Balance from "../models/balance/Balance";
import HistoryBalanceChange from "../models/balance/HistoryBalanceChange";
const getBalance = async (req: Request, res: Response) : Promise<void> => {
    res.send(await Balance.getValue());
}

const replenish = async (req: Request, res: Response) : Promise<void> => {
    await Balance.increase(
        parseInt(req.body.replenish),
        new Date(req.body.date),
        'replenishment'
    )

    res.send(await Balance.getValue());
}

const getHistory = async (req: Request, res: Response) : Promise<void> => {
    res.send(
        {
            items: await HistoryBalanceChange.getPart(
                parseInt(req.params.page),
                req.params.sort,
                parseInt(req.params.size)
            ),
            totalCount: await HistoryBalanceChange.getCount()
        }
    );
}

module.exports = {
    getBalance: getBalance,
    replenish: replenish,
    getHistory: getHistory
}
