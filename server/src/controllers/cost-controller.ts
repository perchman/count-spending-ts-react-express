import { Request, Response } from 'express';

const getPart = async (req: Request, res: Response) : Promise<void>  => {
    res.send(
        {
            items: await Cost.getPart(
                req.params.sort,
                parseInt(req.params.page),
                parseInt(req.params.size)
            ),
            totalCount: await Cost.getCount()
        }
    );
}

const getByUuid = async (req: Request, res: Response) : Promise<void> => {
    res.send(await Cost.getByUuidRaw(req.params.uuid));
}

const createCost = async (req: Request, res: Response) : Promise<void> => {
    try {
        const cost = await Cost.create(
            new Date(req.body.date),
            await Category.getByUuid(req.body.category),
            parseInt(req.body.price),
            req.body.description
        );

        res.send(cost);
    } catch (err) {
        res.sendError(err);
    }
}

const updateCost = async (req: Request, res: Response) : Promise<void> => {
    try {
        const cost = await Cost.getByUuid(req.params.uuid);

        cost.date = new Date(req.body.date);
        cost.category = await Category.getByUuid(req.body.category);
        cost.price = parseInt(req.body.price);
        cost.description = req.body.description;

        cost.save();

        res.send(cost);
    } catch (err) {
        res.sendError(err);
    }
}

const deleteCost = async (req: Request, res: Response) : Promise<void> => {
    const cost = await Cost.getByUuid(req.params.uuid);

    await cost.delete();

    res.send(cost);
}