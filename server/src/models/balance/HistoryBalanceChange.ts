import { HistoryBalanceChangeItem } from "../../frameworks/types/balance/historyBalanceChange-interface";
import MongoDBActiveRecordModel from "../../MongoDBActiveRecordModel";

export default class HistoryBalanceChange extends MongoDBActiveRecordModel {
    date: Date
    type: string
    amount: number

    constructor(uuid: string | null, date: Date, type: string, amount: number) {
        super(uuid);
        this.date = date;
        this.type = type;
        this.amount = amount;
    }

    static getEntityName(): string {
        return 'historyBalanceChange';
    }

    static getDatabaseName(): string {
        return 'Default';
    }

    static async create(date: Date, type: string, amount: number): Promise<HistoryBalanceChange> {
        const historyBalanceChange: HistoryBalanceChange = new HistoryBalanceChange(
            null,
            date,
            type,
            amount
        )

        await historyBalanceChange.save();

        return historyBalanceChange;
    }

    static async makeModel(data: HistoryBalanceChangeItem): Promise<HistoryBalanceChange> {
        return new HistoryBalanceChange(
            data.uuid,
            new Date(data.date),
            data.type,
            data.amount
        );
    }
    toJSON(): HistoryBalanceChangeItem {
        return {
            uuid: this.uuid,
            date: new Date(this.date).getTime(),
            type: this.type,
            amount: this.amount
        };
    }
}