import { CategoryItem } from "./category-interfaces";
import { ObjectId } from "mongodb";

export interface CostItem {
    _id?: ObjectId
    uuid: string | null,
    date: number,
    category: CategoryItem,
    price: number,
    description: string
}