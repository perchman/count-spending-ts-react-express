import { ObjectId } from "mongodb";

export interface CategoryItem {
    id?: ObjectId;
    uuid: string | null;
    name: string;
}
