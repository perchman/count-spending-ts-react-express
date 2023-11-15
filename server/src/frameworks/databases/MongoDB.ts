import { MongoClient, Db, ClientSession } from 'mongodb';
import { MongoDBInterface } from '../types/mongoDB-interface';

export default class MongoDB implements MongoDBInterface {
    name: string;
    client: MongoClient;
    db?: Db;

    constructor(name:string) {
        this.name = name;
        this.client = new MongoClient('mongodb://127.0.0.1:27017/');
    }

    async connect() : Promise<void> {
        try {
            await this.client.connect();
            console.log(`Connection to ${this.name} installed`);
            this.db = this.client.db(this.name);
        } catch(err) {
            console.log(err);
        }
    }

    async transaction(callback: () => Promise<void>) : Promise<void> {
        const session: ClientSession = this.client.startSession();
        try {
            await session.withTransaction(async () : Promise<void> => await callback());
        } catch (err) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
            throw new Error((err as Error).message);
        } finally {
            session.endSession();
        }
    }
}