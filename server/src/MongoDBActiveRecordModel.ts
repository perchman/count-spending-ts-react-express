import { Db, Collection, DeleteResult, WithId } from 'mongodb';
import { MongoDBInterface } from './frameworks/types/mongoDB-interface';
import ServiceLocator from "./ServiceLocator";

const { v4: uuidv4 } = require('uuid');

export default class MongoDBActiveRecordModel {
    uuid: string | null;

    constructor(uuid: string | null) {
        this.uuid = uuid;
    }

    static getEntityName(): any {
        throw new Error('This method in not implemented');
    }

    static getDatabaseName(): any {
        throw new Error('This method in not implemented');
    }

    static getDBManager(): MongoDBInterface {
        return ServiceLocator.get(this.getDatabaseName());
    }

    static getDatabase(): Db {
        const manager: MongoDBInterface = this.getDBManager();

        if (!manager.db) {
            throw new Error('Database is not available');
        }

        return manager.db;
    }

    static async makeModel(data: any): Promise<any> {
        throw new Error('This method in not implemented');
    }

    static async getCount(): Promise<number> {
        const db: Db = this.getDatabase();

        const collection: Collection<Document> = db.collection(this.getEntityName());
        return await collection.countDocuments();
    }

    static async getAllRaw() {
        const db = this.getDatabase();
        const collection = db.collection(this.getEntityName());

        return await collection.find().toArray();
    }

    static async getAllSorted(orderBy: string) {
        const [key, direction] = orderBy.split(' ');

        const db: Db = this.getDatabase();
        const collection = db.collection(this.getEntityName());

        return await collection
            .find()
            .sort({ [key]: direction === 'asc' ? 1 : -1 })
            .toArray();
    }

    static async getPart(pageNum: number, orderBy: string, pageSize: number): Promise<WithId<Document>[]> {
        const [key, direction] : string[] = orderBy.split('_');

        const db: Db = this.getDatabase();
        const collection: Collection<Document> = db.collection(this.getEntityName());

        return await collection
            .find()
            .sort({ [key]: direction === 'asc' ? 1 : -1 })
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .toArray();
    }

    static async getByUuidRaw(uuid: string): Promise<any> {
        const db: Db = this.getDatabase();
        const collection: Collection<Document> = db.collection(this.getEntityName());
        const result: any | null = await collection.findOne({ uuid: uuid});

        if (!result) {
            throw new Error('Document with uuid' + uuid + 'not found.');
        }

        return result;
    }

    static async getByUuid<ModelType extends MongoDBActiveRecordModel>(uuid: string): Promise<ModelType> {
        const obj: any = await this.getByUuidRaw(uuid);

        return await this.makeModel(obj);
    }

    toJSON(): any {
        throw new Error("this method in not implemented");
    }

    async save(): Promise<void> {
        if (!this.uuid) {
            const uuid: string = uuidv4();
            this.uuid = uuid;
        }

        const db: Db = (this.constructor as typeof MongoDBActiveRecordModel).getDatabase();
        const collection: Collection<Document> = db.collection(
            (this.constructor as typeof MongoDBActiveRecordModel).getEntityName()
        );

        const result: WithId<Document> | null = await collection.findOneAndUpdate(
            { uuid: this.uuid },
            { $set: this.toJSON() },
            { upsert: true }
        );
    }

    async delete(): Promise<void> {
        const db: Db = (this.constructor as typeof MongoDBActiveRecordModel).getDatabase();
        const collection: Collection<Document> = db.collection(
            (this.constructor as typeof MongoDBActiveRecordModel).getEntityName()
        );

        const result: DeleteResult = await collection.deleteOne({ uuid: this.uuid });
    }
}