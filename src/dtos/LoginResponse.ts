import type { ItemDto } from "./ItemDto";

export interface LoginResponse {
  id: number,
  email: string,
  password: string,
  token: string,
  basket: ItemDto[]
}