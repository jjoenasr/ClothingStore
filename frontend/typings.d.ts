export interface Size {
    name: string;
    quantity: Number;
    status: string;
}

export interface Product {
    id: number;
    name: string;
    get_absolute_url: string;
    description: string;
    imageURL: string | null;
    price: string;
    sizes: Size[];
    current_price: number;
}

export interface Item {
    product: Product;
    quantity: number;
    size: string;
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

export interface Order {
    id: number;
    number: string;
    items: Item[];
    paid_amount: number;
    total_items: number;
}