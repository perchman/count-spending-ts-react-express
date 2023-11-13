import { CategoryRawInterface, CategoryInterface } from "../frameworks/types/category-interfaces";
import {MongoDBActiveRecordModelInterface} from "../frameworks/types/mongoDBActiveRecordModel-interface";

const MongoDBActiveRecordModel = require('../MongoDBActiveRecordModel');
export class Category extends MongoDBActiveRecordModel implements CategoryInterface, MongoDBActiveRecordModelInterface {
    name: string

    constructor(uuid: string | null, name: string) {
        super(uuid);
        this.name = name;
    }

    static getEntityName() : string {
        return 'category';
    }

    static getDatabaseName() : string {
        return 'Default';
    }

    static makeModel(data : CategoryInterface) : Category {
        return new Category(data.uuid, data.name);
    }

    static async create(name: string) : Promise<Category> {
        const category : Category = new Category(
            null,
            name
        )

        await category.save();

        return category;
    }

    toJSON() : CategoryRawInterface {
        let obj : CategoryRawInterface = {
            uuid: this.uuid,
            name: this.name
        }

        return obj;
    }

    async checkCanRemove() : Promise<void> {
        const db = (this.constructor as typeof Category).getDatabase();
        const collection = db.collection('cost');

        const costs = await collection.find().toArray();

        for (let cost in costs) {
            if (costs[cost].category.uuid === this.uuid) {
                throw new Error(`Can't delete category ${this.name}. The category has costs.`);
            }
        }
    }

    async delete() : Promise<void> {
        await this.checkCanRemove();
        await super.delete();
    }
}