export interface Category {
    uuid: string;
    name: string;
}

export interface CategoryDataForm {
    uuid?: string;
    name: string;
}

export interface Cost {
    uuid: string;
    date: string;
    category: {
        uuid: string,
        name: string
    }
    price: string;
    description: string;
}

export interface CostDataForm {
    uuid?: string;
    date: string;
    category: string;
    price: string;
    description: string;
}

export interface HistoryBalanceChange {
    uuid: string;
    date: string;
    type: string;
    amount: string;
}

export interface HistoryBalanceChangeFormData {
    date: string;
    amount: string;
}