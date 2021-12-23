import type { ItemDetailsDto } from "./ItemDetailsDto";

export interface ItemDto {
    id: number,
    brand: string,
    name: string,
    price: number,
    currency: string,
    image: string,
    details: ItemDetailsDto
  }