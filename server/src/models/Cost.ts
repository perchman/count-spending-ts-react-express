import { CostItem } from "../frameworks/types/cost-interfaces";
import { MongoDBInterface } from "../frameworks/types/mongoDB-interface";

import Category from "./Category";
import Balance from "./balance/Balance";
import MongoDBActiveRecordModel from "../MongoDBActiveRecordModel";

export default class Cost extends MongoDBActiveRecordModel {
    date: Date
    category: Category
    price: number
    description: string
    initData: {
        date: Date,
        category: Category,
        price: number,
        description: string
    }

    constructor(uuid: string | null, date: Date, category: Category, price: number, description: string) {
        super(uuid);
        this.date = date;
        this.category = category;
        this.price = price;
        this.description = description;

        this.initData = {
            date: date,
            category: category,
            price: price,
            description: description
        }
    }

    static getEntityName(): string {
        return 'cost';
    }

    static getDatabaseName(): string {
        return 'Default';
    }

    static async makeModel(data: CostItem): Promise<Cost> {
        return new Cost(
            data.uuid,
            new Date(data.date),
            await Category.getByUuid(data.category.uuid as string),
            data.price,
            data.description
        );
    }

    static async create(date: Date, category: Category, price: number, description: string) : Promise<Cost> {
        const cost : Cost = new Cost(
            null,
            date,
            category,
            price,
            description
        )

        await cost.save();

        return cost;
    }

    static async existsCostsHasCategory(categoryUuid : string) : Promise<boolean> {
        const costs = await Cost.getAllRaw();
        for (let cost in costs) {
            if (costs[cost].category.uuid === categoryUuid) {
                return true;
            }
        }
        return false;
    }

    toJSON(): CostItem {
        return {
            uuid: this.uuid,
            date: new Date(this.date).getTime(),
            category: this.category.toJSON(),
            price: this.price,
            description: this.description
        };
    }

    async save(): Promise<void> {
        const manager : MongoDBInterface = await (this.constructor as typeof MongoDBActiveRecordModel).getDBManager();

        await manager.transaction(async () : Promise<void> => {
            const isNew : boolean = !this.uuid;

            if (isNew) {
                await Balance.decrease(
                    this.price,
                    this.date,
                    'deduction'
                );
            } else {
                if (this.initData.price < this.price) {
                    await Balance.decrease(
                        this.price - this.initData.price,
                        this.date,
                        'deduction'
                    );
                } else {
                    await Balance.increase(
                        this.initData.price - this.price,
                        this.date,
                        'refund'
                    );
                }
            }

            await super.save();
        });
    }


    async delete(): Promise<void> {
        const manager: MongoDBInterface = await (this.constructor as typeof MongoDBActiveRecordModel).getDBManager();

        await manager.transaction(async () : Promise<void> => {
            await super.delete();

            await Balance.increase(
                this.price,
                new Date(),
                'refund'
            );
        });
    }
}