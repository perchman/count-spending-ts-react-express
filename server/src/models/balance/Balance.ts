import BalanceMongoDB from "./BalanceMongoDB";
import HistoryBalanceChange from "./HistoryBalanceChange";

export default class Balance extends BalanceMongoDB {
    constructor() {
        super();
    }

    static async increase(value: number, date: Date, type: string): Promise<void> {
        const result: number = await this.getValue() + value;
        await this.save(result, value, date, type);
    }

    static async decrease(value: number, date: Date, type: string): Promise<void> {
        const result: number = await this.getValue() - value;
        if (result < 0) {
            throw new Error("Not enough money on balance");
        }

        await this.save(result, value, date, type);
    }

    static async save(result: number, value: number, date: Date, type: string): Promise<void> {
        await this.saveValue(result);

        const historyBalanceChange: HistoryBalanceChange = await HistoryBalanceChange.create(
            new Date(date),
            type,
            value
        );
    }
}