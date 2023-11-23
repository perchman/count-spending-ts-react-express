export interface Category {
    uuid?: string;
    name: string;
}

export interface Cost {
    uuid?: string;
    date: string;
    category: string;
    price: string;
    description: string;
}