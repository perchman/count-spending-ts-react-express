import { MongoClient, Db } from 'mongodb';

export default interface MongoDBInterface {
    name: string;
    client: MongoClient;
    db?: Db;
    connect(): Promise<void>;
    transaction(callback: () => Promise<void>): Promise<void>;
}