import { Request, Response } from 'express';
import { Category } from "../models/Category";

const getCategoryByUuid = async (req: Request, res: Response) : Promise<void> => {
    res.send(await Category.getByUuid(req.params.uuid));
}

const getPartCategories = async (req: Request, res: Response) : Promise<void> => {
    res.send({
        items: await Category.getPart(
            req.params.sort,
            parseInt(req.params.page),
            parseInt(req.params.size),
        ),
        totalCount: await Category.getCount()
    })
}

const createCategory = async (req: Request, res: Response) : Promise<void>  => {
    const category = await Category.create(req.body.name);

    res.send(category);
}

const updateCategory = async (req: Request, res: Response) : Promise<void> => {
    const category = await Category.getByUuid(req.params.uuid);
    category.name = req.body.name;
    await category.save();

    res.send(category);
}

const deleteCategory = async (req: Request, res: Response) : Promise<void> => {
    try {
        const category = await Category.getByUuid(req.params.uuid);
        await category.delete();

        res.send(category);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getCategoryByUuid: getCategoryByUuid,
    getPartCategories: getPartCategories,
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}
