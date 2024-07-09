export interface Product {
    id: number;
    name: string;
    description: string;
    get_absolute_url: string;
    imageURL: string | null;
    current_price: number;
}

export interface Item {
    product: Product;
    quantity: number;
    size: number;
}

export interface ShippingAddress {
    address: string,
    city: string,
    state: string,
    zipcode: string
}

export interface ItemCreate {
    product: number;
    quantity: number;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}