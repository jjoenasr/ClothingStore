export interface Product {
    id: number;
    name: string;
    description: string;
    get_absolute_url: string;
    imageURL: string | null;
    price: number;
}

export interface Item {
    product: Product;
    quantity: number;
    size: number;
}