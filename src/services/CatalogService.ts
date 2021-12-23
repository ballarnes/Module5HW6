import "reflect-metadata";
import { inject, injectable } from "inversify";
import { MethodType } from "./HttpService";
import type { HttpService } from "./HttpService";
import ownTypes from "../ioc/ownTypes";
import type { ItemDto } from "../dtos/ItemDto";

export interface CatalogService {
    getById(id: number): Promise<ItemDto>;
    getByPage(page: number): Promise<ItemDto[]>;
}

@injectable()
export default class DefaultCatalogService implements CatalogService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService
    ) {
    }

    public async getById(id: number): Promise<ItemDto> {
        const result = await this.httpService.send<ItemDto>(`items/${id}`, MethodType.GET);
        return result.data;
    }

    public async getByPage(page: number): Promise<ItemDto[]> {
        const result = await this.httpService.send<ItemDto[]>(`items?_page=${page}&_limit=8`, MethodType.GET);
        return result.data;
    }
}