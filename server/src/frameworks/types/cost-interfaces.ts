import { CategoryInterface } from "./category-interfaces";

// export interface CostRawInterface {
//     uuid: string,
//     date: number,
//     category: CategoryRawInterface,
//     price: number,
//     description: string
// }

export interface CostInterface {
    uuid: string,
    date: number,
    category: CategoryInterface,
    price: number,
    description: string
}