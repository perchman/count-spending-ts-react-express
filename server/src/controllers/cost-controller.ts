import { Request, Response } from 'express';
import Cost from "../models/Cost";
import Category from "../models/Category";

const getCostByUuid = async (req: Request, res: Response) : Promise<void> => {
    res.send(await Cost.getByUuid(req.params.uuid))
}

const getPartCosts = async (req: Request, res: Response) : Promise<void>  => {
    res.send(
        {
            items: await Cost.getPart(
                parseInt(req.params.page),
                req.params.sort,
                parseInt(req.params.size)
            ),
            totalCount: await Cost.getCount()
        }
    );
}

const createCost = async (req: Request, res: Response) : Promise<void> => {
    try {
        const cost : Cost = await Cost.create(
            new Date(req.body.date),
            await Category.getByUuid(req.body.category),
            parseInt(req.body.price),
            req.body.description
        );

        res.send(cost);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
}

const updateCost = async (req: Request, res: Response) : Promise<void> => {
    try {
        const cost : Cost = await Cost.getByUuid(req.params.uuid);

        cost.date = new Date(req.body.date);
        cost.category = await Category.getByUuid(req.body.category);
        cost.price = parseInt(req.body.price);
        cost.description = req.body.description;

        await cost.save();

        res.send(cost);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
}

const deleteCost = async (req: Request, res: Response) : Promise<void> => {
    const cost : Cost = await Cost.getByUuid(req.params.uuid);

    await cost.delete();

    res.send(cost);
}

module.exports = {
    getCostByUuid: getCostByUuid,
    getPartCosts: getPartCosts,
    createCost: createCost,
    updateCost: updateCost,
    deleteCost: deleteCost
}