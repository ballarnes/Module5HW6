import "reflect-metadata";
import { inject, injectable } from "inversify";
import { MethodType } from "./HttpService";
import type { HttpService } from "./HttpService";
import ownTypes from "../ioc/ownTypes";
import type { UserDto } from "../dtos/UserDto";

export interface UserService {
    getById(id: number): Promise<UserDto>;
}

@injectable()
export default class DefaultUserService implements UserService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService
    ) {
    }

    public async getById(id: number): Promise<UserDto> {
        const result = await this.httpService.send<UserDto>(`accounts/${id}`, MethodType.GET);
        return result.data;
    }
}

