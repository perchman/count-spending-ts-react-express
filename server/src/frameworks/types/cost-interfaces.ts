import { CategoryRawInterface } from "./category-interfaces";

export interface CostRawInterface {
    uuid: string,
    date: number,
    category: CategoryRawInterface,
    price: number,
    description: string
}

export interface CostInterface {

}