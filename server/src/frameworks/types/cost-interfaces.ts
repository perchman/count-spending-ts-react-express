import { CategoryItem } from "./category-interfaces";
import { ObjectId } from "mongodb";

export interface CostItem {
    _id?: ObjectId
    uuid: string | null,
    date: number,
    categoryUuid: string,
    price: number,
    description: string
}

export interface CostItemWithUuid {
    uuid: string,
    date: number,
    categoryUuid: string,
    price: number,
    description: string
}

export interface CostItemWithId {
    _id: ObjectId,
    uuid: string,
    date: number,
    categoryUuid: string,
    price: number,
    description: string
}

export interface CostItemToSend {
    _id: ObjectId,
    uuid: string,
    date: number,
    category: {
        uuid: string,
        name: string
    }
    price: number,
    description: string
}