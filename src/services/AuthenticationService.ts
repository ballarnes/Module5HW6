import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ContentType, MethodType } from "./HttpService";
import type { HttpService } from "./HttpService";
import ownTypes from "../ioc/ownTypes";
import type { LoginResponse } from "../dtos/LoginResponse";
import type { RegisterResponse } from "../dtos/RegisterResponse";
import { KeyType } from "./LocalStorageService";
import type { LocalStorageService } from "./LocalStorageService";
import type { ItemDto } from "../dtos/ItemDto";
import { UserDto } from "../dtos/UserDto";

export interface AuthenticationService {
    login(email: string, password: string): Promise<LoginResponse>;
    logout(token: string): Promise<void>;
}

@injectable()
export default class DefaultAuthenticationService implements AuthenticationService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService,
        @inject(ownTypes.localStorageService) private readonly localStorageService: LocalStorageService
    ) {
    }

    public async login(email: string, password: string): Promise<LoginResponse> {
        // const headers = { contentType: ContentType.Json};
        // const data = { email, password };
        // const result = await this.httpService.send<LoginResponse>(`accounts`, MethodType.POST, headers, data);
        // this.localStorageService.set(KeyType.Token, result.data.token);
        // return result.data;
        const result = await this.httpService.send<LoginResponse[]>(`accounts`, MethodType.GET);
        const account = await result.data.find(el => el.email === email && el.password === password);
        if (account != null) {
            this.localStorageService.set(KeyType.Id, account.id);
            this.localStorageService.set(KeyType.Token, account.token);
            this.localStorageService.set(KeyType.Basket, account.basket);
            return { id: account.id, token: account.token, email: account.email, password: '***', basket: account.basket };
        }
        // if (result.data.email === email && result.data.password === password) {
        //     this.localStorageService.set(KeyType.Id, result.data.id);
        //     this.localStorageService.set(KeyType.Token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
        //     return { id: result.data.id, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', email: result.data.email, password: '***'};
        // }
        throw Error("Login failed");
    }

    public async register(name: string, lastname: string, email: string, password: string, avatar: string, date: string): Promise<RegisterResponse> {
        const headers = { contentType: ContentType.Json};
        const token = String(Math.random()*10000000000000000);
        const basket: ItemDto[] = [];
        const data = { name, lastname, email, password, avatar, date, token, basket };
        const result = await this.httpService.send<RegisterResponse>(`accounts`, MethodType.POST, headers, data);
        // return result.data;
        this.localStorageService.set(KeyType.Id, result.data.id);
        this.localStorageService.set(KeyType.Token, token);
        this.localStorageService.set(KeyType.Basket, basket);
        return { id: result.data.id, token: token };
    }

    public async logout(token: string): Promise<void> {
        const headers = { contentType: ContentType.Json};
        const id = this.localStorageService.get<number>(KeyType.Id);
        const result = await this.httpService.send<UserDto>(`accounts/${id}`, MethodType.GET);
        const basket = this.localStorageService.get<ItemDto[]>(KeyType.Basket);
        this.localStorageService.remove(KeyType.Id);
        this.localStorageService.remove(KeyType.Basket);
        const name = result.data.name;
        const lastname = result.data.lastname;
        const email = result.data.email;
        const password = result.data.password;
        const avatar = result.data.avatar;
        const date = result.data.date;
        const data = { name, lastname, email, password, avatar, date, token, basket };
        await this.httpService.send<void>(`accounts/${id}`, MethodType.PUT, headers, data);
    }
}