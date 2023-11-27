import { MongoDBInterface } from "../../frameworks/types/mongoDB-interface";
import { Collection, Db, WithId } from 'mongodb';
import { BalanceItem } from "../../frameworks/types/balance/balance";

import ServiceLocator from "../../ServiceLocator";

export default class BalanceMongoDB {
    static getDatabaseName(): string {
        return 'Default';
    }

    static getDatabase(): Db {
        const manager: MongoDBInterface = ServiceLocator.get(this.getDatabaseName());

        if (!manager.db) {
            throw new Error('Database is not available');
        }

        return manager.db;
    }

    static async getValue(): Promise<number> {
        const db: Db = this.getDatabase();
        const collection: Collection<BalanceItem> = db.collection('balance');
        const obj: WithId<BalanceItem> | null = await collection.findOne({ key: 'balance' });

        return obj ? obj.value : 0;
    }

    static async saveValue(value: number): Promise<void> {
        const db: Db = this.getDatabase();
        const collection: Collection<BalanceItem> = db.collection('balance');
        const result: WithId<BalanceItem> | null = await collection.findOneAndUpdate(
            { key: 'balance' },
            { $set: { key: 'balance', value: value } },
            { upsert: true }
        );
    }
}