/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import { injectable } from "inversify";

export interface LocalStorageService {
    get<T>(key: KeyType): T | null;
    set<T>(key: KeyType, value: T): void;
    remove(key: KeyType): void;
}

export enum KeyType {
    Id,
    Token,
    Basket
}

@injectable()
export default class DefaultLocalStorageService implements LocalStorageService {

    public get<T>(key: KeyType): T | null {
        const value = localStorage.getItem(KeyType[key]);
        if (value === null) {
            return null;
        }
        return JSON.parse(value);
    }

    public set<T>(key: KeyType, value: T): void {
        localStorage.setItem(KeyType[key], JSON.stringify(value));
    }

    public remove(key: KeyType): void {
        localStorage.removeItem(KeyType[key]);
    }
}