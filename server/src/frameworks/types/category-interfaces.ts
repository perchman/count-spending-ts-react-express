export interface CategoryRawInterface {
    uuid: string | null;
    name: string;
}

export interface CategoryInterface {
    name: string;
    checkCanRemove() : Promise<void>
}
