import type { ItemDetails } from "./ItemDetails";

export interface Item {
    id: number,
    brand: string,
    name: string,
    price: number,
    currency: string,
    image: string,
    details: ItemDetails
}