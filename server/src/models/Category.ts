import { CategoryItem } from "../frameworks/types/category-interfaces";
import Cost from "./Cost";
import MongoDBActiveRecordModel from "../MongoDBActiveRecordModel";

export default class Category extends MongoDBActiveRecordModel {
    name: string

    constructor(uuid: string | null, name: string) {
        super(uuid);
        this.name = name;
    }

    static getEntityName(): string {
        return 'category';
    }

    static getDatabaseName(): string {
        return 'Default';
    }

    static async create(name: string): Promise<Category> {
        const category: Category = new Category(
            null,
            name
        )

        await category.save();

        return category;
    }

    static override async makeModel(data: CategoryItem): Promise<Category> {
        return new Category(data.uuid, data.name);
    }

    toJSON(): CategoryItem {
        return {
            uuid: this.uuid,
            name: this.name
        };
    }

    async checkCanRemove(): Promise<void> {
        if (!this.uuid) {
            throw new Error('Uuid is null. Method cannot be used without uuid');
        }

        if (await Cost.existsCostsHasCategory(this.uuid)) {
            throw new Error(`Can't delete category ${this.name}. The category has costs.`);
        }
    }

    async delete(): Promise<void> {
        await this.checkCanRemove();
        await super.delete();
    }
}