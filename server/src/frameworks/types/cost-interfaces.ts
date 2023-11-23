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