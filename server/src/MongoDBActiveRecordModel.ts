import { Collection, Db, WithId } from 'mongodb';
import { MongoDBActiveRecordModelInterface } from "./frameworks/types/mongoDBActiveRecordModel-interface";
import { MongoDBInterface } from './frameworks/types/mongoDB-interface';

const { v4: uuidv4 } = require('uuid');
const ServiceLocator = require('./ServiceLocator');

export class MongoDBActiveRecordModel implements MongoDBActiveRecordModelInterface {
    uuid: string | null;

    constructor(uuid: string | null) {
        this.uuid = uuid;
    }

    static getEntityName() : string {
        throw new Error('This method in not implemented');
    }

    static getDatabaseName() : string {
        throw new Error('This method in not implemented');
    }

    static getDBManager() {
        return ServiceLocator.get('Default');
    }

    static getDatabase() : Db {
        const manager: MongoDBInterface = this.getDBManager();

        if (!manager.db) {
            throw new Error('Database is not available');
        }

        return manager.db;
    }

    static makeModel<Type>(obj: Type) : Type {
        throw new Error('This method in not implemented');
    }

    static async getCount() : Promise<number> {
        const db: Db = this.getDatabase();

        const collection: Collection<Document> = db.collection(this.getEntityName());
        return await collection.countDocuments();
    }

    static async getAllRaw() : Promise<WithId<Document>[]> {
        const db: Db = this.getDatabase();
        const collection: Collection<Document> = db.collection(this.getEntityName());

        return await collection.find().toArray();
    }

    static async getAllSorted(orderBy: string) : Promise<WithId<Document>[]> {
        const [key, direction] = orderBy.split(' ');

        const db: Db = this.getDatabase();
        const collection: Collection<Document> = db.collection(this.getEntityName());

        return await collection
            .find()
            .sort({ [key]: direction === 'asc' ? 1 : -1 })
            .toArray();
    }

    static async getPart(orderBy: string, pageNum: number, pageSize: number) : Promise<WithId<Document>[]> {
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

    static async getByUuidRaw(uuid: string) : Promise<WithId<Document>> {
        const db: Db = this.getDatabase();
        const collection: Collection<Document> = db.collection(this.getEntityName());
        const result : WithId<Document> | null = await collection.findOne({ uuid: uuid});

        if (!result) {
            throw new Error('Document with uuid' + uuid + 'not found.');
        }

        return result;
    }

    static async getByUuid(uuid: string)  {
        const obj : WithId<Document> = await this.getByUuidRaw(uuid);

        return this.makeModel(obj);
    }

    toJSON() : any {
        throw new Error("this method in not implemented");
    }

    async save() : Promise<void> {
        if (!this.uuid) {
            const uuid: string = uuidv4();
            this.uuid = uuid;
        }

        const db: Db = (this.constructor as typeof MongoDBActiveRecordModel).getDatabase();
        const collection: Collection<Document> = db.collection(
            (this.constructor as typeof MongoDBActiveRecordModel).getEntityName()
        );

        const result = await collection.findOneAndUpdate(
            { uuid: this.uuid },
            { $set: this.toJSON() },
            { upsert: true }
        );
    }

    async delete() : Promise<void> {
        const db: Db = (this.constructor as typeof MongoDBActiveRecordModel).getDatabase();
        const collection: Collection<Document> = db.collection(
            (this.constructor as typeof MongoDBActiveRecordModel).getEntityName()
        );

        const result = await collection.deleteOne({ uuid: this.uuid });
    }
}